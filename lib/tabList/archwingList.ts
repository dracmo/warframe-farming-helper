type Archwing = {
  name: string;
  category: string;
  type: "prime" | "standard";
  id: number;
};

export const archwing: Archwing[] = [
  { id: 2002001, name: "Amesha", category: "ARCHWING", type: "standard" },
  { id: 2002, name: "Elytron", category: "ARCHWING", type: "standard" },
  { id: 2003, name: "Itzal", category: "ARCHWING", type: "standard" },
  { id: 2004, name: "Odonata", category: "ARCHWING", type: "standard" },
  { id: 2005, name: "Odonata Prime", category: "ARCHWING", type: "prime" },
];

export const Nechramech: Archwing[] = [
  { id: 2001, name: "Bonewidow", category: "NECHRAMECH", type: "standard" },
  { id: 2002, name: "Voidrig", category: "NECHRAMECH", type: "standard" },
];
