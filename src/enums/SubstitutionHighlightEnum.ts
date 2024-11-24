export enum SubstitutionHighlightEnum {
  SUBSTITUTION = "substitution",
}

export function isSubstitutionHighlightId(value: string): value is SubstitutionHighlightEnum {
  return Object.values(SubstitutionHighlightEnum).includes(value as SubstitutionHighlightEnum);
}