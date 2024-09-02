import { StackScreenProps } from "@react-navigation/stack";

export type StackParamList = {
  Home: undefined,
  GameOverview: undefined,
  AddHighlight: undefined,
}

export type HomeScreenProps = StackScreenProps<StackParamList, "Home">;
export type GameOverviewScreenProps = StackScreenProps<StackParamList, "GameOverview">;
export type AddHighlightScreenProps = StackScreenProps<StackParamList, "AddHighlight">;