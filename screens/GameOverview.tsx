import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useApplicationStore from "@/stores/ApplicationStore";
import { isDisciplinaryHighlight } from "@/types/highlight/DisciplinaryHighlightType";
import { HighlightType } from "@/types/highlight/HighlightType";
import { isSubstitutionHighlight } from "@/types/highlight/SubstitutionHighlightType";
import { GameOverviewScreenProps } from "@/types/NavigationType";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GameOverview({ navigation }: GameOverviewScreenProps) {
  const appStore = useApplicationStore();

  function renderHighlightList(highlights: HighlightType[]) {
    return (
      <ThemedView style={styles.highlightsList}>
        {highlights.map((highlight: HighlightType, index) => {
          if (isDisciplinaryHighlight(highlight)) {
            return (
              <ThemedView key={"home" + index} style={styles.highlightItem}>
                <ThemedText>{highlight.label} - {highlight.player}</ThemedText>
                <ThemedText>{highlight.minute}'</ThemedText>
              </ThemedView>
            );
          } else if (isSubstitutionHighlight(highlight)) {
            return (
              <ThemedView key={"home" + index} style={styles.highlightItem}>
                <ThemedText>{highlight.playerSubstituted} X {highlight.playerSubstitute}</ThemedText>
                <ThemedText>{highlight.minute}'</ThemedText>
              </ThemedView>
            );
          } else {
            return (
              <ThemedView key={"home" + index} style={styles.highlightItem}>
                <ThemedText>{highlight.label}</ThemedText>
                <ThemedText>{highlight.minute}'</ThemedText>
              </ThemedView>
            );
          }
        })}
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.main}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTeams}>
          {appStore.teamHome} vs {appStore.teamVisitor}
        </ThemedText>
        <ThemedText style={styles.headerScores}>
          {appStore.scoreHome} - {appStore.scoreVisitor}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.highlightsContainer}>
        {renderHighlightList(appStore.highlightsHome)}
        <View style={styles.verticalLine}></View>
        {renderHighlightList(appStore.highlightsVisitor)}
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
    height: "100%",
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
    // height: "100%"
    paddingVertical: 16,
  },
  highlightsList: {
    width: "50%",
  },
  highlightItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
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
    marginBottom: 32,
    // borderRadius: 8
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  textAlignRight: {
    textAlign: "right",
  },
});
