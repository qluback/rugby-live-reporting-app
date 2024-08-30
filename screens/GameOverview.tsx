import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useApplicationStore from "@/stores/ApplicationStore";
import { GameOverviewScreenProps } from "@/types/NavigationType";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GameOverview({ navigation }: GameOverviewScreenProps) {
  const appStore = useApplicationStore();
  return (
    <ThemedView style={styles.main}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTeams}>
          {appStore.teamHome} vs {appStore.teamVisitor}
        </ThemedText>
        <ThemedText style={styles.headerScores}>0 - 0</ThemedText>
      </ThemedView>
      <ThemedView style={styles.highlightsContainer}>
        <ThemedText>ABCDEF</ThemedText>
        <View style={styles.verticalLine}></View>
        <ThemedText>ABCDEF</ThemedText>
      </ThemedView>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("AddHighlight")}
      >
        <Text style={styles.buttonText}>Ajouter un temps-fort</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  main: {
    height: "100%"
  },
  header: {
    backgroundColor: "#002A61",
    height: 200,
    justifyContent: "center",
    gap: 8,
  },
  headerTeams: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  headerScores: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 24,
  },
  highlightsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    padding: 16,
    // height: "100%"
  },
  verticalLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
  },
  button: {
    backgroundColor: "#002A61",
    padding: 16,
    margin: 16,
    marginBottom: 32
    // borderRadius: 8
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold"
  },
});
