import { DisciplinaryHighlightType } from "./DisciplinaryHighlightType";
import { ScoringHighlightType } from "./ScoringHighlightType";
import { SubstitutionHighlightType } from "./SubstitutionHighlightType";

export type HighlightType =
  | ScoringHighlightType
  | DisciplinaryHighlightType
  | SubstitutionHighlightType;
