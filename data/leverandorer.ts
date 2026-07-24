export type Leverandor = {
  id: string;
  navn: string;
  sted?: string;
};

export const leverandorer: Leverandor[] = [
  { id: "harmonie", navn: "Harmonie" },
  { id: "natre", navn: "Natre" },
  { id: "norwin", navn: "Norwin" },
  { id: "bjervamoen", navn: "Bjervamoen", sted: "Lunde, Telemark" },
  { id: "gilje", navn: "Gilje" },
  { id: "uldal", navn: "Uldal" },
  { id: "vatnestrom", navn: "Vatnestrøm" },
];
