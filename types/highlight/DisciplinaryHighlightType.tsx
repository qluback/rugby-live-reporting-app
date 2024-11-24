import { HighlightType } from "./HighlightType";

export type DisciplinaryHighlightType = {
  id: string;
  label: string;
  playerSanctioned: number | null;
  minute: number;
};

export function isDisciplinaryHighlight(
  highlight: HighlightType
): highlight is DisciplinaryHighlightType {
  if ((highlight as DisciplinaryHighlightType).playerSanctioned) {
    return true;
  }

  return false;
}
