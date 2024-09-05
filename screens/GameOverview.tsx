import DisciplinaryHighlightItem from "@/components/highlight/DisciplinaryHighlightItem";
import ScoringHighlightItem from "@/components/highlight/ScoringHighlightItem";
import SubstitutionHighlightItem from "@/components/highlight/SubstitutionHighlightItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Timer from "@/components/Timer";
import useApplicationStore from "@/stores/ApplicationStore";
import { isDisciplinaryHighlight } from "@/types/highlight/DisciplinaryHighlightType";
import { HighlightType } from "@/types/highlight/HighlightType";
import { isSubstitutionHighlight } from "@/types/highlight/SubstitutionHighlightType";
import { GameOverviewScreenProps } from "@/types/NavigationType";
import { useEffect } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GameOverview({ navigation }: GameOverviewScreenProps) {
  const appStore = useApplicationStore();

  useEffect(() => {
    navigation.addListener("beforeRemove", (event) => {
      event.preventDefault();
      Alert.alert(
        "Match encore en cours",
        "Êtes-vous sûr de vouloir quitter ?",
        [
          { text: "Annuler", style: "cancel", onPress: () => {} },
          {
            text: "Quitter",
            style: "destructive",
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigation.dispatch(event.data.action),
          },
        ]
      );
    });
  }, [navigation]);

  function renderHighlightList(highlights: HighlightType[]) {
    return (
      <ThemedView style={styles.highlightsList}>
        {highlights.map((highlight: HighlightType, index) => {
          if (isDisciplinaryHighlight(highlight)) {
            return (
              <DisciplinaryHighlightItem
                key={"home" + index}
                highlight={highlight}
              />
            );
          }
          if (isSubstitutionHighlight(highlight)) {
            return (
              <SubstitutionHighlightItem
                key={"home" + index}
                highlight={highlight}
              />
            );
          }

          return (
            <ScoringHighlightItem key={"home" + index} highlight={highlight} />
          );
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
        <Timer />
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
