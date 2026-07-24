export type Leverandor = {
  id: string;
  navn: string;
  sted?: string;
  nettside: string;
};

export const leverandorer: Leverandor[] = [
  { id: "harmonie", navn: "Harmonie", nettside: "https://www.harmonie.no" },
  { id: "natre", navn: "Natre", nettside: "https://natre.no" },
  { id: "norwin", navn: "Norwin", nettside: "https://www.norwin.no" },
  {
    id: "bjervamoen",
    navn: "Bjervamoen",
    sted: "Lunde, Telemark",
    nettside: "https://www.bjervamoen.no",
  },
  { id: "gilje", navn: "Gilje", nettside: "https://www.gilje.no" },
  { id: "uldal", navn: "Uldal", nettside: "https://www.uldal.no" },
  {
    id: "vatnestrom",
    navn: "Vatnestrøm",
    nettside: "https://dorfabrikken.no",
  },
];
