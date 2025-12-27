export type Category = { color: string; label: string; includes: string[] };
export type CategoryGroupKey = "Platforms" | "Communities" | "Infra / Restoration";

const rawCategories = [
  "Restor.eco",
  "Karma HQ",
  "Giveth.io",
  "Toucan Protocol",
  "Coorest",
  "Nori",
  "Regen Network",
  "KlimaDAO",
  "Terra0",
  "ReFi",
  "Indigenous",
  "Tech",
  "Network State",
  "Ecovillage",
  "Database/Map",
  "Network Hub",
  "Restoration",
  "Community"
];

export const categoryLookup: Record<string, CategoryGroupKey> = {
  "Restor.eco": "Platforms",
  "Karma HQ": "Platforms",
  "Giveth.io": "Platforms",
  "Toucan Protocol": "Platforms",
  Coorest: "Platforms",
  Nori: "Platforms",
  "Regen Network": "Platforms",
  KlimaDAO: "Platforms",
  Terra0: "Platforms",
  ReFi: "Communities",
  Indigenous: "Communities",
  Tech: "Communities",
  "Network State": "Communities",
  Ecovillage: "Communities",
  Community: "Communities",
  "Database/Map": "Infra / Restoration",
  "Network Hub": "Infra / Restoration",
  Restoration: "Infra / Restoration"
};

export const projectCategories: Record<CategoryGroupKey, Category> = {
  Platforms: {
    color: "#0ea5e9",
    label: "Platform networks",
    includes: [
      "Restor.eco",
      "Karma HQ",
      "Giveth.io",
      "Toucan Protocol",
      "Coorest",
      "Nori",
      "Regen Network",
      "KlimaDAO",
      "Terra0"
    ]
  },
  Communities: {
    color: "#f59e0b",
    label: "Communities & hubs",
    includes: ["ReFi", "Indigenous", "Tech", "Network State", "Ecovillage", "Community"]
  },
  "Infra / Restoration": {
    color: "#10b981",
    label: "Infra & Restoration",
    includes: ["Database/Map", "Network Hub", "Restoration"]
  }
};

export const projectCategoryOptions = rawCategories;
