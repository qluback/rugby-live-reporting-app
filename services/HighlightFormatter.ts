import { HighlightDto } from "../dto/HighlightDto";
import { ScoringHighlights } from "../constants/ScoringHighlights";
import { HighlightType } from "../types/highlight/HighlightType";

export function formatHighlights(highlights: HighlightDto[]): HighlightType[] {
  const updatedHighlights: HighlightType[] = [];

  highlights.map((highlight: HighlightDto) => {
    updatedHighlights.push({
      id: highlight.type,
      label: ScoringHighlights[highlight.type].label,
      points: ScoringHighlights[highlight.type].points,
      minute: highlight.minute,
    });
  });

  return updatedHighlights;
}