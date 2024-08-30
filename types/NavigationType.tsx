import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types"

export type RootStackParamList = {
  Home: undefined,
  GameOverview: undefined,
}

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type GameOverviewScreenProps = NativeStackScreenProps<RootStackParamList, "GameOverview">;