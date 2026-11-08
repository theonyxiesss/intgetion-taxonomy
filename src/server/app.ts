import { z, ZodError } from "zod";
import {
  HttpError,
  httpErrorResponse,
  notFound,
  reportError,
  validationError,
} from "@intgetion/kit";
import * as taxonomy from "../modules/taxonomy/service";
import { isUuid, requireServiceToken } from "./auth";

export type AppConfig = { serviceToken: string };

const rawBody = z.object({ raw: z.string().min(1).max(200) }).strict();
const normalizeBody = z
  .object({
    raw: z.string().min(1).max(200),
    source: taxonomy.skillSourceSchema.default("user"),
  })
  .strict();
const extractBody = z.object({ text: z.string().max(50_000) }).strict();
const mapBody = z.object({ skillId: z.string().uuid() }).strict();
const listQuery = z.object({
  cursor: z.string().max(200).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

const MAX_BODY = 64 * 1024;

async function readBody<T>(request: Request, schema: z.ZodType<T>): Promise<T> {
  const text = await request.text();
  if (text.length > MAX_BODY) {
    throw new HttpError(413, "PAYLOAD_TOO_LARGE", "Body too large");
  }
  let json: unknown;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw validationError({ body: "invalid json" });
  }
  return schema.parse(json);
}

function uuidParam(value: string | undefined): string {
  if (!value || !isUuid(value)) throw notFound();
  return value;
}

type Route = {
  method: string;
  pattern: RegExp;
  run: (request: Request, params: string[], url: URL) => Promise<unknown>;
};

const routes: Route[] = [
  {
    method: "GET",
    pattern: /^\/v1\/catalog$/,
    run: async () => ({
      categories: taxonomy.SKILL_CATEGORIES,
      markerSkills: taxonomy.MARKER_SKILLS,
      similarityThreshold: taxonomy.SKILL_SIMILARITY_THRESHOLD,
    }),
  },
  {
    method: "GET",
    pattern: /^\/v1\/skills$/,
    run: async () => ({ skills: await taxonomy.listActiveSkills() }),
  },
  {
    method: "GET",
    pattern: /^\/v1\/skills\/stats$/,
    run: async () => taxonomy.getSkillCatalogStats(),
  },
  {
    method: "POST",
    pattern: /^\/v1\/skills\/normalize$/,
    run: async (request) => {
      const input = await readBody(request, normalizeBody);
      return taxonomy.normalizeSkill(input.raw, input.source);
    },
  },
  {
    method: "POST",
    pattern: /^\/v1\/skills\/match$/,
    run: async (request) => ({
      slug: await taxonomy.matchSkillSlug((await readBody(request, rawBody)).raw),
    }),
  },
  {
    method: "POST",
    pattern: /^\/v1\/skills\/extract$/,
    run: async (request) => ({
      skillIds: await taxonomy.extractSkillsFromText(
        (await readBody(request, extractBody)).text,
      ),
    }),
  },
  {
    method: "GET",
    pattern: /^\/v1\/suggestions$/,
    run: async (_request, _params, url) =>
      taxonomy.listSkillSuggestions(
        listQuery.parse(Object.fromEntries(url.searchParams)),
      ),
  },
  {
    method: "GET",
    pattern: /^\/v1\/suggestions\/count$/,
    run: async () => ({ pending: await taxonomy.countPendingSkillSuggestions() }),
  },
  {
    method: "POST",
    pattern: /^\/v1\/suggestions\/([^/]+)\/map$/,
    run: async (request, [id]) =>
      taxonomy.mapSkillSuggestion(
        uuidParam(id),
        (await readBody(request, mapBody)).skillId,
      ),
  },
  {
    method: "POST",
    pattern: /^\/v1\/suggestions\/([^/]+)\/reject$/,
    run: async (_request, [id]) => taxonomy.rejectSkillSuggestion(uuidParam(id)),
  },
  {
    method: "POST",
    pattern: /^\/v1\/jobs\/seed-catalog$/,
    run: async () => {
      await taxonomy.seedSkills();
      return { ok: true };
    },
  },
];

export function toResponse(error: unknown): Response {
  if (error instanceof HttpError) return httpErrorResponse(error);
  if (error instanceof ZodError) {
    return httpErrorResponse(validationError(error.issues));
  }
  reportError(error, "taxonomy-service");
  return Response.json(
    { error: { code: "INTERNAL", message: "Internal error" } },
    { status: 500 },
  );
}

export function createApp(config: AppConfig) {
  return async function handle(request: Request): Promise<Response> {
    const url = new URL(request.url);
    try {
      if (request.method === "GET" && url.pathname === "/health") {
        return Response.json({ ok: true });
      }
      requireServiceToken(request, config.serviceToken);
      for (const route of routes) {
        if (route.method !== request.method) continue;
        const match = route.pattern.exec(url.pathname);
        if (!match) continue;
        return Response.json(await route.run(request, match.slice(1), url));
      }
      throw notFound();
    } catch (error) {
      return toResponse(error);
    }
  };
}
