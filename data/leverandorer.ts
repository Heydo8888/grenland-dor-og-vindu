export type Kategori = "Vindu" | "Ytterdør" | "Innerdør" | "Garasjeport" | "Dør";

export type Leverandor = {
  id: string;
  navn: string;
  sted?: string;
  nettside: string;
  kategorier: Kategori[];
};

export const leverandorer: Leverandor[] = [
  {
    id: "harmonie",
    navn: "Harmonie",
    nettside: "https://www.harmonie.no",
    kategorier: ["Vindu", "Ytterdør", "Innerdør", "Garasjeport"],
  },
  {
    id: "natre",
    navn: "Natre",
    nettside: "https://natre.no",
    kategorier: ["Vindu", "Ytterdør"],
  },
  {
    id: "norwin",
    navn: "Norwin",
    nettside: "https://www.norwin.no",
    kategorier: ["Vindu", "Ytterdør"],
  },
  {
    id: "bjervamoen",
    navn: "Bjervamoen",
    sted: "Lunde, Telemark",
    nettside: "https://www.bjervamoen.no",
    kategorier: ["Vindu"],
  },
  {
    id: "gilje",
    navn: "Gilje",
    nettside: "https://www.gilje.no",
    kategorier: ["Vindu", "Ytterdør"],
  },
  {
    id: "uldal",
    navn: "Uldal",
    nettside: "https://www.uldal.no",
    kategorier: ["Vindu", "Dør"],
  },
  {
    id: "vatnestrom",
    navn: "Vatnestrøm",
    nettside: "https://dorfabrikken.no",
    kategorier: ["Ytterdør"],
  },
];
