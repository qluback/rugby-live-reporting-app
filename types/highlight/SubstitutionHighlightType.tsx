import { HighlightType } from "./HighlightType";

export type SubstitutionHighlightType = {
  id: string;
  label: string;
  playerSubstituted: number;
  playerSubstitute: number;
  minute: number;
};

export function isSubstitutionHighlight(
  highlight: HighlightType
): highlight is SubstitutionHighlightType {
  if ((highlight as SubstitutionHighlightType).playerSubstituted) {
    return true;
  }
  return false;
}
