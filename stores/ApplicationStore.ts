import { TeamSideEnum } from "@/enums/TeamSideEnum";
import { HighlightType } from "@/types/HighlightType";
import { create } from "zustand";

type Store = {
  teamHome: string;
  teamVisitor: string;
  highlightsHome: HighlightType[];
  highlightsVisitor: HighlightType[];
  setTeamHome: (name: string) => void;
  setTeamVisitor: (name: string) => void;
  updateHighlights: (highlight: HighlightType, team: string) => void;
};

const useApplicationStore = create<Store>((set) => ({
  teamHome: "Athis-Mons",
  teamVisitor: "Juvisy",
  highlightsHome: [],
  highlightsVisitor: [],
  setTeamHome: (name: string) => set({ teamHome: name }),
  setTeamVisitor: (name: string) => set({ teamVisitor: name }),
  updateHighlights: (highlight: HighlightType, teamSide: string) =>
    set((state) => {
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
