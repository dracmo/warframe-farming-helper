type Archwing = {
  name: string;
  category: string;
  type: "prime" | "standard";
  id: number;
};

export const archwing: Archwing[] = [
  { id: 1, name: "Amesha", category: "ARCHWING", type: "standard" },
  { id: 2, name: "Elytron", category: "ARCHWING", type: "standard" },
  { id: 3, name: "Itzal", category: "ARCHWING", type: "standard" },
  { id: 4, name: "Odonata", category: "ARCHWING", type: "standard" },
  { id: 5, name: "Odonata Prime", category: "ARCHWING", type: "prime" },
];

export const Nechramech: Archwing[] = [
  { id: 1, name: "Bonewidow", category: "NECHRAMECH", type: "standard" },
  { id: 2, name: "Voidrig", category: "NECHRAMECH", type: "standard" },
];
