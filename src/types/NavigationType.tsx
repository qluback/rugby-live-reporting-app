import { StackScreenProps } from "@react-navigation/stack";

export type StackParamList = {
  Home: undefined,
  NewGame: undefined,
  History: undefined,
  GameOverview: {id: number}|undefined,
  AddHighlight: undefined,
}

export type HomeScreenProps = StackScreenProps<StackParamList, "Home">;
export type NewGameScreenProps = StackScreenProps<StackParamList, "NewGame">;
export type HistoryScreenProps = StackScreenProps<StackParamList, "History">;
export type GameOverviewScreenProps = StackScreenProps<StackParamList, "GameOverview">;
export type AddHighlightScreenProps = StackScreenProps<StackParamList, "AddHighlight">;