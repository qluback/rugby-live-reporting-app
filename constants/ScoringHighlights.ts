

export const ScoringHighlights: Record<
  string,
  { id: string; label: string; points: number }
> = {
  try: { id: "try", label: "Essai", points: 5 },
  convertedTry: { id: "convertedTry", label: "Essai transformé", points: 7 },
  penaltyTry: { id: "penaltyTry", label: "Essai de pénalité", points: 7 },
  penalty: { id: "penalty", label: "Pénalité", points: 3 },
  dropGoal: { id: "dropGoal", label: "Drop", points: 3 },
};
