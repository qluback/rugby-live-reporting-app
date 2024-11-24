export enum ScoringHighlightEnum {
  TRY = "try",
  CONVERTED_TRY = "convertedTry",
  PENALTY_TRY = "penaltyTry",
  PENALTY = "penalty",
  DROP_GOAL = "dropGoal",
}

export function isScoringHighlightId(
  value: string
): value is ScoringHighlightEnum {
  return Object.values(ScoringHighlightEnum).includes(
    value as ScoringHighlightEnum
  );
}
