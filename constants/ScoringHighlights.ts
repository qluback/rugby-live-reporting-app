import { ScoringHighlightEnum } from "@/enums/ScoringHighlightEnum";


export const ScoringHighlights: Record<
  string,
  { id: string; label: string; points: number }
> = {
  try: { id: ScoringHighlightEnum.TRY, label: "Essai", points: 5 },
  convertedTry: { id: ScoringHighlightEnum.CONVERTED_TRY, label: "Essai transformé", points: 7 },
  penaltyTry: { id: ScoringHighlightEnum.PENALTY_TRY, label: "Essai de pénalité", points: 7 },
  penalty: { id: ScoringHighlightEnum.PENALTY, label: "Pénalité", points: 3 },
  dropGoal: { id: ScoringHighlightEnum.DROP_GOAL, label: "Drop", points: 3 },
};
