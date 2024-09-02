import { ScoringHighlight } from "@/constants/ScoringHighlights";
import { TeamSideEnum } from "@/enums/TeamSideEnum";
import { HighlightType } from "@/types/HighlightType";
import { create } from "zustand";

type Store = {
  teamHome: string;
  teamVisitor: string;
  highlightsHome: HighlightType[];
  highlightsVisitor: HighlightType[];
  scoreHome: number,
  scoreVisitor: number,
  setTeamHome: (name: string) => void;
  setTeamVisitor: (name: string) => void;
  addHighlight: (highlight: HighlightType, points: number, team: string) => void;
};

const useApplicationStore = create<Store>((set) => ({
  teamHome: "Athis-Mons",
  teamVisitor: "Juvisy",
  scoreHome: 0,
  scoreVisitor: 0,
  highlightsHome: [],
  highlightsVisitor: [],
  setTeamHome: (name: string) => set({ teamHome: name }),
  setTeamVisitor: (name: string) => set({ teamVisitor: name }),
  addHighlight: (highlight: HighlightType, points: number, teamSide: string) =>
    set((state) => {
      let updatedHighlights: HighlightType[] = [];
      switch (teamSide) {
        case TeamSideEnum.HOME:
          updatedHighlights = [...state.highlightsHome, highlight];

          return { highlightsHome: updatedHighlights.sort(compare), scoreHome: state.scoreHome + points };
        case TeamSideEnum.VISITOR:
          updatedHighlights = [...state.highlightsVisitor, highlight];

          return { highlightsVisitor: updatedHighlights.sort(compare), scoreVisitor: state.scoreVisitor + points};
        default:
          return state;
      }
    }),
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
