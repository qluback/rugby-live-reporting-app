import { HighlightType } from "./HighlightType";

export type SubstitutionHighlightType = {
  id: string;
  label: string;
  playerSubstituted: number | null;
  playerSubstitute: number | null;
  minute: number;
};

export function isSubstitutionHighlight(
  highlight: HighlightType
): highlight is SubstitutionHighlightType {
  if (
    (highlight as SubstitutionHighlightType).playerSubstituted &&
    (highlight as SubstitutionHighlightType).playerSubstitute
  ) {
    return true;
  }
  return false;
}
