import { Game } from "../constants/Game";
import { TeamSideEnum } from "../enums/TeamSideEnum";
import { DisciplinaryHighlightType } from "../types/highlight/DisciplinaryHighlightType";
import { HighlightType } from "../types/highlight/HighlightType";
import { ScoringHighlightType } from "../types/highlight/ScoringHighlightType";
import { SubstitutionHighlightType } from "../types/highlight/SubstitutionHighlightType";
import { create } from "zustand";
import { TeamCompetingType } from "../types/TeamCompetingType";
import { formatHighlights } from "../services/HighlightFormatter";

type Store = {
  teamHome: TeamCompetingType | null;
  teamVisitor: TeamCompetingType | null;
  scoreHome: number;
  scoreVisitor: number;
  highlightsHome: HighlightType[];
  highlightsVisitor: HighlightType[];
  timerSeconds: number;
  timerOn: boolean;
  halfTime: number;
  status: number;

  setGame: (game: any) => void;
  resetStore: () => void;
  setTeam: (team: TeamCompetingType, side: TeamSideEnum) => void;
  addScoringHighlight: (
    highlight: ScoringHighlightType,
    teamSide: string
  ) => void;
  addPlayerHighlight: (
    highlight: DisciplinaryHighlightType | SubstitutionHighlightType,
    team: string
  ) => void;
  setTimerSeconds: () => void;
  setTimerOn: (status: boolean) => void;
  getCurrentTimerMinute: () => number;
  endHalfTime: () => void;
  endGame: () => void;
};

const initialState = {
  teamHome: null,
  teamVisitor: null,
  scoreHome: 0,
  scoreVisitor: 0,
  highlightsHome: [],
  highlightsVisitor: [],
  timerSeconds: 0,
  timerOn: false,
  halfTime: 1,
  status: 0,
};

const useApplicationStore = create<Store>((set, get) => ({
  ...initialState,
  setGame: (game) =>
    set(() => {
      return {
        teamHome: game.teamCompetingHome,
        teamVisitor: game.teamCompetingVisitor,
        scoreHome: game.scoreHome,
        scoreVisitor: game.scoreVisitor,
        highlightsHome: formatHighlights(
          game.teamCompetingHome.highlights
        ).sort(compare),
        highlightsVisitor: formatHighlights(
          game.teamCompetingVisitor.highlights
        ).sort(compare),
        timerSeconds: game.time,
        halfTime: game.halfTime,
        status: game.status,
      };
    }),
  resetStore: () => set({ ...initialState }),
  setTeam: (team: TeamCompetingType, side: TeamSideEnum) =>
    set(() => {
      switch (side) {
        case TeamSideEnum.HOME:
          return { teamHome: team };
        case TeamSideEnum.VISITOR:
          return { teamVisitor: team };
      }
    }),
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
  setTimerOn: (timerIsOn: boolean) =>
    set((state) => ({
      timerOn: timerIsOn,
      status: timerIsOn ? Game.status.inProgress : state.status,
    })),
  getCurrentTimerMinute: (): number => {
    return Math.floor(get().timerSeconds / 60) + 1;
  },
  endHalfTime: () =>
    set({ timerSeconds: Game.durationHalfTimeInSeconds, halfTime: 2 }),
  endGame: () =>
    set({ timerSeconds: Game.durationSeconds, halfTime: 2, status: 2 }),
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
