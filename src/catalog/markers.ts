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
