/** Skill categories and the Web3 marker skills (D202, MARKERS.md). Owned by taxonomy. */

export const JOB_CATEGORIES = [
  "engineering",
  "data",
  "design",
  "product",
  "marketing",
  "sales",
  "support",
  "operations",
  "finance",
  "hr",
  "legal",
  "content",
  "community",
  "research",
] as const;
export type JobCategory = (typeof JOB_CATEGORIES)[number];

export type MarkerSkill = {
  slug: string;
  nameEn: string;
  nameRu: string;
  category: JobCategory;
  /** Lookup keys already passed through normalizeSkillText. */
  aliases: readonly string[];
};

/** Slugs follow MARKERS.md. Lookup keys match normalizeSkillText (D42, D206). */
export const MARKER_SKILLS: readonly MarkerSkill[] = [
  {
    slug: "solidity",
    nameEn: "Solidity",
    nameRu: "Solidity",
    category: "engineering",
    aliases: ["solidity", "sol"],
  },
  {
    slug: "smartcontracts",
    nameEn: "Smart Contracts",
    nameRu: "Смарт-контракты",
    category: "engineering",
    aliases: ["smartcontracts", "smartcontract"],
  },
  {
    slug: "zkproofs",
    nameEn: "Zero-Knowledge Proofs",
    nameRu: "ZK-доказательства",
    category: "engineering",
    aliases: [
      "zkproofs",
      "zeroknowledgeproofs",
      "zk",
      "zeroknowledge",
      "zkp",
      "zksnarks",
    ],
  },
  {
    slug: "substrate",
    nameEn: "Substrate",
    nameRu: "Substrate",
    category: "engineering",
    aliases: ["substrate", "polkadotsdk"],
  },
  {
    slug: "evm",
    nameEn: "EVM",
    nameRu: "EVM",
    category: "engineering",
    aliases: ["evm", "ethereumvirtualmachine"],
  },
  {
    slug: "anchor",
    nameEn: "Anchor",
    nameRu: "Anchor (Solana)",
    category: "engineering",
    aliases: ["anchor", "solanaanchor"],
  },
  {
    slug: "web3js",
    nameEn: "web3.js",
    nameRu: "web3.js / ethers.js",
    category: "engineering",
    aliases: ["web3js", "web3", "ethers"],
  },
  {
    slug: "ios",
    nameEn: "iOS",
    nameRu: "iOS",
    category: "engineering",
    aliases: ["ios", "swift", "swiftui"],
  },
  {
    slug: "django",
    nameEn: "Django",
    nameRu: "Django",
    category: "engineering",
    aliases: ["django", "djangorest"],
  },
  {
    slug: "rubyonrails",
    nameEn: "Ruby on Rails",
    nameRu: "Ruby on Rails",
    category: "engineering",
    aliases: ["rubyonrails", "rails", "ror"],
  },
  {
    slug: "sre",
    nameEn: "Site Reliability Engineering",
    nameRu: "SRE",
    category: "engineering",
    aliases: ["sre", "sitereliability", "sitereliabilityengineering"],
  },
  {
    slug: "fullstack",
    nameEn: "Full-stack",
    nameRu: "Фулстек",
    category: "engineering",
    aliases: ["fullstack", "fullstackdeveloper"],
  },
  {
    slug: "technicalwriting",
    nameEn: "Technical Writing",
    nameRu: "Техническое письмо",
    category: "content",
    aliases: ["technicalwriting", "technicalwriter", "docs"],
  },
  {
    slug: "translation",
    nameEn: "Translation",
    nameRu: "Переводы",
    category: "content",
    aliases: ["translation", "translator", "localization"],
  },
  {
    slug: "contentwriting",
    nameEn: "Content Writing",
    nameRu: "Контент",
    category: "content",
    aliases: ["contentwriting", "contentwriter"],
  },
  {
    slug: "memes",
    nameEn: "Meme Marketing",
    nameRu: "Мемы",
    category: "marketing",
    aliases: ["memes", "meme", "mememarketing"],
  },
  {
    slug: "eventmarketing",
    nameEn: "Event Marketing",
    nameRu: "Ивент-маркетинг",
    category: "marketing",
    aliases: ["eventmarketing", "events"],
  },
  {
    slug: "communitymanagement",
    nameEn: "Community Management",
    nameRu: "Комьюнити-менеджмент",
    category: "community",
    aliases: ["communitymanagement", "communitymanager", "discord"],
  },
  {
    slug: "devrel",
    nameEn: "Developer Relations",
    nameRu: "DevRel",
    category: "community",
    aliases: ["devrel", "developeradvocate"],
  },
  {
    slug: "compliance",
    nameEn: "Compliance",
    nameRu: "Комплаенс",
    category: "legal",
    aliases: ["compliance", "regulatory"],
  },
  {
    slug: "aml",
    nameEn: "AML / KYC",
    nameRu: "AML / KYC",
    category: "legal",
    aliases: ["aml", "amlkyc", "antimoneylaundering", "kyc"],
  },
  {
    slug: "cryptolaw",
    nameEn: "Crypto Law",
    nameRu: "Крипто-право",
    category: "legal",
    aliases: ["cryptolaw", "cryptoregulation"],
  },
  {
    slug: "tokenomics",
    nameEn: "Tokenomics",
    nameRu: "Токеномика",
    category: "research",
    aliases: ["tokenomics", "tokeneconomics"],
  },
  {
    slug: "economics",
    nameEn: "Economics",
    nameRu: "Экономика",
    category: "research",
    aliases: ["economics", "economist"],
  },
  {
    slug: "quant",
    nameEn: "Quantitative Analysis",
    nameRu: "Квант-анализ",
    category: "research",
    aliases: ["quant", "quantitativeanalysis"],
  },
  {
    slug: "trading",
    nameEn: "Trading",
    nameRu: "Трейдинг",
    category: "research",
    aliases: ["trading", "marketmaking"],
  },
  {
    slug: "venturecapital",
    nameEn: "Venture Capital",
    nameRu: "Венчур",
    category: "research",
    aliases: ["venturecapital", "vc"],
  },
  {
    slug: "dataanalysis",
    nameEn: "Data Analysis",
    nameRu: "Анализ данных",
    category: "data",
    aliases: ["dataanalysis", "dataanalyst"],
  },
];

/** Job and candidate markers (D202, MARKERS.md): employment, seniority, sectors, perks. */

export const EMPLOYMENT_TYPES = [
  "full_time",
  "part_time",
  "contract",
  "freelance",
  "internship",
] as const;
export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export const SENIORITY_LEVELS = [
  "internship",
  "entry",
  "mid",
  "senior",
  "lead",
] as const;
export type Seniority = (typeof SENIORITY_LEVELS)[number];

export const MAX_JOB_SECTORS = 3;
export const MAX_CANDIDATE_SECTORS = 5;
export const MAX_JOB_PERKS = 8;

export const PERKS = [
  "crypto-pay",
  "token-equity",
  "async",
  "four-day-week",
  "visa-support",
  "relocation",
  "no-degree",
  "junior-friendly",
  "own-timezone",
] as const;
export type Perk = (typeof PERKS)[number];

export const SENSITIVE_SECTORS = ["igaming", "memecoins"] as const;

const web3 = [
  "web3",
  "defi",
  "nft",
  "gamefi",
  "metaverse",
  "zk",
  "dao",
  "infra-l1l2",
  "exchange",
  "memecoins",
  "crypto-vc",
  "eco-ethereum",
  "eco-solana",
  "eco-fantom",
  "eco-polkadot",
] as const;

const ai = [
  "ai-ml",
  "genai",
  "computer-vision",
  "robotics",
  "data-analytics",
] as const;

const finance = [
  "fintech",
  "banking",
  "payments",
  "insurtech",
  "quant-trading",
  "accounting-tax",
] as const;

const products = [
  "saas-b2b",
  "devtools",
  "cloud-infra",
  "open-source",
  "cybersecurity",
  "ecommerce",
  "marketplaces",
  "adtech-martech",
  "hr-tech",
] as const;

const games = [
  "gamedev",
  "igaming",
  "ar-vr",
  "media-streaming",
  "creator-economy",
  "music",
] as const;

const health = [
  "healthtech",
  "medtech",
  "biotech",
  "mental-health",
  "fitness",
] as const;

const society = [
  "edtech",
  "govtech",
  "legaltech",
  "nonprofit",
  "climatetech",
  "energy",
] as const;

const industry = [
  "logistics",
  "proptech",
  "autotech",
  "agritech",
  "foodtech",
  "travel",
  "space",
  "hardware-iot",
  "telecom",
] as const;

export const SECTOR_GROUPS = [
  { id: "web3", sectors: web3 },
  { id: "ai", sectors: ai },
  { id: "finance", sectors: finance },
  { id: "products", sectors: products },
  { id: "games", sectors: games },
  { id: "health", sectors: health },
  { id: "society", sectors: society },
  { id: "industry", sectors: industry },
] as const;

export const SECTORS = SECTOR_GROUPS.flatMap((group) => group.sectors);
export type Sector = (typeof SECTORS)[number];

export function isSector(value: string): value is Sector {
  return (SECTORS as readonly string[]).includes(value);
}

export function isSensitiveSector(sectors: readonly string[]): boolean {
  return sectors.some((sector) =>
    (SENSITIVE_SECTORS as readonly string[]).includes(sector),
  );
}

/** Web3 sectors stay ahead of the others when a card shows two badges. */
export function sectorsForCard(
  sectors: readonly string[],
  limit = 2,
): string[] {
  const known = sectors.filter(isSector);
  const first = known.filter((sector) =>
    (web3 as readonly string[]).includes(sector),
  );
  const rest = known.filter(
    (sector) => !(web3 as readonly string[]).includes(sector),
  );
  return [...first, ...rest].slice(0, limit);
}
