import { HighlightType } from "./HighlightType";

export type DisciplinaryHighlightType = {
  id: string;
  label: string;
  player: number;
  minute: number;
};

export function isDisciplinaryHighlight(
  highlight: HighlightType
): highlight is DisciplinaryHighlightType {
  if ((highlight as DisciplinaryHighlightType).player) {
    return true;
  }
  return false;
}
