import { HighlightDto } from "../dto/HighlightDto";
import { ScoringHighlights } from "../constants/ScoringHighlights";
import { HighlightType } from "../types/highlight/HighlightType";
import { PlayerHighlights } from "../constants/PlayerHighlights";
import { isScoringHighlightId } from "../enums/ScoringHighlightEnum";
import { isDisciplinaryHighlightId } from "../enums/DisciplinaryHighlightEnum";
import { isSubstitutionHighlightId } from "../enums/SubstitutionHighlightEnum";

export function formatHighlights(highlights: HighlightDto[]): HighlightType[] {
  const updatedHighlights: HighlightType[] = [];

  highlights.map((highlight: HighlightDto) => {
    if (isScoringHighlightId(highlight.type)) {
      updatedHighlights.push({
        id: highlight.type,
        label: ScoringHighlights[highlight.type].label,
        points: ScoringHighlights[highlight.type].points,
        minute: highlight.minute,
      });
    }

    if (
      isDisciplinaryHighlightId(highlight.type) &&
      highlight.playerSanctioned !== null
    ) {
      updatedHighlights.push({
        id: highlight.type,
        label: PlayerHighlights[highlight.type].label,
        minute: highlight.minute,
        playerSanctioned: highlight.playerSanctioned,
      });
    }

    if (
      isSubstitutionHighlightId(highlight.type) &&
      highlight.playerSubstituted !== null &&
      highlight.playerSubstitute !== null
    ) {
      updatedHighlights.push({
        id: highlight.type,
        label: PlayerHighlights[highlight.type].label,
        minute: highlight.minute,
        playerSubstituted: highlight.playerSubstituted,
        playerSubstitute: highlight.playerSubstitute,
      });
    }
  });

  return updatedHighlights;
}
