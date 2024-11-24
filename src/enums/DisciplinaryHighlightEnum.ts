export enum DisciplinaryHighlightEnum {
  YELLOW_CARD = "yellowCard",
  RED_CARD = "redCard",
}

export function isDisciplinaryHighlightId(value: string): value is DisciplinaryHighlightEnum {
  return Object.values(DisciplinaryHighlightEnum).includes(value as DisciplinaryHighlightEnum);
}