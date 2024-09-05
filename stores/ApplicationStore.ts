import { TeamSideEnum } from "@/enums/TeamSideEnum";
import { DisciplinaryHighlightType } from "@/types/highlight/DisciplinaryHighlightType";
import { HighlightType } from "@/types/highlight/HighlightType";
import { ScoringHighlightType } from "@/types/highlight/ScoringHighlightType";
import { SubstitutionHighlightType } from "@/types/highlight/SubstitutionHighlightType";
import { create } from "zustand";

type Store = {
  teamHome: string;
  teamVisitor: string;
  scoreHome: number;
  scoreVisitor: number;
  highlightsHome: HighlightType[];
  highlightsVisitor: HighlightType[];
  timerSeconds: number;
  timerOn: boolean;
  setTeamHome: (name: string) => void;
  setTeamVisitor: (name: string) => void;
  addScoringHighlight: (highlight: ScoringHighlightType, team: string) => void;
  addPlayerHighlight: (
    highlight: DisciplinaryHighlightType | SubstitutionHighlightType,
    team: string
  ) => void;
  setTimerSeconds: () => void;
  setTimerOn: (status: boolean) => void;
};

const useApplicationStore = create<Store>((set) => ({
  teamHome: "Athis-Mons",
  teamVisitor: "Juvisy",
  scoreHome: 0,
  scoreVisitor: 0,
  highlightsHome: [],
  highlightsVisitor: [],
  timerSeconds: 57,
  timerOn: false,
  setTeamHome: (name: string) => set({ teamHome: name }),
  setTeamVisitor: (name: string) => set({ teamVisitor: name }),
  addScoringHighlight: (highlight: ScoringHighlightType, teamSide: string) =>
    set((state) => {
      let updatedHighlights: HighlightType[] = [];
      switch (teamSide) {
        case TeamSideEnum.HOME:
          updatedHighlights = [...state.highlightsHome, highlight];

          return {
            highlightsHome: updatedHighlights.sort(compare),
            scoreHome: state.scoreHome + highlight.points,
          };
        case TeamSideEnum.VISITOR:
          updatedHighlights = [...state.highlightsVisitor, highlight];

          return {
            highlightsVisitor: updatedHighlights.sort(compare),
            scoreVisitor: state.scoreVisitor + highlight.points,
          };
        default:
          return state;
      }
    }),
  addPlayerHighlight: (
    highlight: DisciplinaryHighlightType | SubstitutionHighlightType,
    teamSide: string
  ) =>
    set((state) => {
      console.log(highlight);
      let updatedHighlights: HighlightType[] = [];
      switch (teamSide) {
        case TeamSideEnum.HOME:
          updatedHighlights = [...state.highlightsHome, highlight];

          return { highlightsHome: updatedHighlights.sort(compare) };
        case TeamSideEnum.VISITOR:
          updatedHighlights = [...state.highlightsVisitor, highlight];

          return { highlightsVisitor: updatedHighlights.sort(compare) };
        default:
          return state;
      }
    }),
  setTimerSeconds: () =>
    set((state) => ({ timerSeconds: state.timerSeconds + 1 })),
  setTimerOn: (status: boolean) => set((state) => ({ timerOn: status })),
}));

function compare(a: HighlightType, b: HighlightType) {
  if (Number(a.minute) < Number(b.minute)) {
    return -1;
  }
  if (Number(a.minute) > Number(b.minute)) {
    return 1;
  }
  return 0;
}

export default useApplicationStore;
