import { beforeEach, describe, expect, it, vi } from "vitest";

const service = vi.hoisted(() => ({
  normalizeSkill: vi.fn(async () => ({ status: "matched", slug: "react" })),
  matchSkillSlug: vi.fn(async () => "react"),
  extractSkillsFromText: vi.fn(async () => ["id-1"]),
  listSkillSuggestions: vi.fn(async () => ({ items: [], nextCursor: null })),
  mapSkillSuggestion: vi.fn(async () => ({ id: "s" })),
  seedSkills: vi.fn(async () => {}),
}));

vi.mock("../modules/taxonomy/service", async (orig) => ({
  ...(await orig<typeof import("../modules/taxonomy/service")>()),
  ...service,
}));

const { createApp } = await import("./app");

const TOKEN = "test-taxonomy-token";
const handle = createApp({ serviceToken: TOKEN });
const ID = "33333333-3333-4333-8333-333333333333";

function call(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("authorization", `Bearer ${TOKEN}`);
  return handle(new Request(`http://taxonomy${path}`, { ...init, headers }));
}

beforeEach(() => vi.clearAllMocks());

describe("taxonomy service HTTP", () => {
  it("answers health without a token and refuses a wrong one", async () => {
    expect((await handle(new Request("http://taxonomy/health"))).status).toBe(200);
    const refused = await handle(
      new Request("http://taxonomy/v1/catalog", {
        headers: { authorization: "Bearer nope" },
      }),
    );
    expect(refused.status).toBe(401);
  });

  it("serves the category catalog", async () => {
    const body = (await (await call("/v1/catalog")).json()) as {
      categories: string[];
      markerSkills: { slug: string }[];
    };
    expect(body.categories).toContain("engineering");
    expect(body.markerSkills.some((skill) => skill.slug === "solidity")).toBe(true);
  });

  it("normalizes with the default source and validates input", async () => {
    const ok = await call("/v1/skills/normalize", {
      method: "POST",
      body: JSON.stringify({ raw: "React.js" }),
    });
    expect(ok.status).toBe(200);
    expect(service.normalizeSkill).toHaveBeenCalledWith("React.js", "user");
    const bad = await call("/v1/skills/normalize", {
      method: "POST",
      body: JSON.stringify({ raw: "x", source: "robot" }),
    });
    expect(bad.status).toBe(400);
  });

  it("extracts skills from a text", async () => {
    const response = await call("/v1/skills/extract", {
      method: "POST",
      body: JSON.stringify({ text: "React and Solidity developer" }),
    });
    expect(await response.json()).toEqual({ skillIds: ["id-1"] });
  });

  it("parses the suggestion list query", async () => {
    await call("/v1/suggestions?limit=10");
    expect(service.listSkillSuggestions).toHaveBeenCalledWith({ limit: 10 });
    expect((await call("/v1/suggestions?limit=500")).status).toBe(400);
  });

  it("maps a suggestion by id and refuses a bad id", async () => {
    const ok = await call(`/v1/suggestions/${ID}/map`, {
      method: "POST",
      body: JSON.stringify({ skillId: ID }),
    });
    expect(ok.status).toBe(200);
    expect(service.mapSkillSuggestion).toHaveBeenCalledWith(ID, ID);
    expect(
      (await call("/v1/suggestions/nope/map", { method: "POST", body: "{}" })).status,
    ).toBe(404);
  });
});
