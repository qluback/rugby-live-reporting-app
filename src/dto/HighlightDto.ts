export interface HighlightDto {
  type: string,
  minute: number,
  playerSanctioned: number|null,
  playerSubstituted: number|null,
  playerSubstitute: number|null,
}