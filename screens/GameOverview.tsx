import { ThemedText } from "@/components/ThemedText";
import useApplicationStore from "@/stores/ApplicationStore";
import { GameOverviewScreenProps } from "@/types/NavigationType";
import { Text } from "react-native";

export default function GameOverview({navigation}: GameOverviewScreenProps) {
  const appStore = useApplicationStore();
  return (
    <ThemedText>{appStore.teamHome} vs {appStore.teamVisitor}</ThemedText>
  );
}