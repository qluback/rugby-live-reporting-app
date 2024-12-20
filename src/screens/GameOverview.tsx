import { SuccessResponseDto } from "../dto/SuccessResponseDto";
import DisciplinaryHighlightItem from "../components/highlight/DisciplinaryHighlightItem";
import ScoringHighlightItem from "../components/highlight/ScoringHighlightItem";
import SubstitutionHighlightItem from "../components/highlight/SubstitutionHighlightItem";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import Timer from "../components/Timer";
import useApplicationStore from "../stores/ApplicationStore";
import { HighlightType } from "../types/highlight/HighlightType";
import { GameOverviewScreenProps } from "../types/NavigationType";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Game } from "../constants/Game";
import { isDisciplinaryHighlight } from "../types/highlight/DisciplinaryHighlightType";
import { isSubstitutionHighlight } from "../types/highlight/SubstitutionHighlightType";
import { FlatList } from "react-native-gesture-handler";

export default function GameOverview({
  route,
  navigation,
}: GameOverviewScreenProps) {
  const appStore = useApplicationStore();
  const [timerInterval, setTimerInterval] = useState<
    ReturnType<typeof setInterval> | undefined
  >();

  useEffect(() => {
    if (route?.params?.id !== undefined) {
      getGame(route.params.id);
    }
  }, []);

  async function getGame(gameId: number) {
    const response = await fetch("http://127.0.0.1:8000/api/games/" + gameId);
    const jsonResponse: SuccessResponseDto = await response.json();
    appStore.setGame(jsonResponse.data);
  }

  const startTimer = () => {
    clearInterval(timerInterval);
    appStore.setTimerOn(true);
    setTimerInterval(
      setInterval(() => {
        appStore.setTimerSeconds();
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearTimeout(timerInterval);
    appStore.setTimerOn(false);
  };

  function renderHighlightList(highlights: HighlightType[]) {
    return (
      <FlatList
        data={highlights}
        renderItem={({ item }) => renderHighlightItem(item)}
        keyExtractor={(item, index) => index.toString()}
        style={styles.highlightsList}
      />
    );
  }

  function renderHighlightItem(highlight: HighlightType) {
    if (isDisciplinaryHighlight(highlight)) {
      return <DisciplinaryHighlightItem highlight={highlight} />;
    }
    if (isSubstitutionHighlight(highlight)) {
      return <SubstitutionHighlightItem highlight={highlight} />;
    }

    return <ScoringHighlightItem highlight={highlight} />;
  }

  function handleEndHalfTime() {
    Alert.alert(
      "Fin de la mi-temps",
      "Êtes-vous sûr de vouloir clôturer la mi-temps ?",
      [
        {
          text: "Annuler",
          style: "cancel",
          onPress: () => {},
        },
        {
          text: "Confirmer",
          style: "destructive",
          onPress: async () => {
            stopTimer();
            appStore.endHalfTime();
            await sendUpdateGameRequest({
              time: Game.durationHalfTimeInSeconds,
              halfTime: 2,
              status: appStore.status,
            });
          },
        },
      ]
    );
  }

  function handleEndGame() {
    Alert.alert(
      "Fin du match",
      "Êtes-vous sûr de vouloir clôturer le match ?",
      [
        {
          text: "Annuler",
          style: "cancel",
          onPress: () => {},
        },
        {
          text: "Confirmer",
          style: "destructive",
          onPress: async () => {
            stopTimer();
            appStore.endGame();
            await sendUpdateGameRequest({
              time: Game.durationSeconds,
              halfTime: 2,
              status: 2,
            });
          },
        },
      ]
    );
  }

  function handleQuitGame() {
    Alert.alert("Match encore en cours", "Êtes-vous sûr de vouloir quitter ?", [
      {
        text: "Annuler",
        style: "cancel",
        onPress: () => {},
      },
      {
        text: "Quitter",
        style: "destructive",
        onPress: async () => {
          stopTimer();
          // appStore.resetStore();
          await sendUpdateGameRequest({
            time: appStore.timerSeconds,
            status: appStore.status,
          });
          navigation.navigate("Home");
        },
      },
    ]);
  }

  async function sendUpdateGameRequest(params: any) {
    try {
      if (route?.params?.id === undefined) {
        throw new Error("Unable to update game : ID not found");
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/games/${route.params.id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );

      if (!response.ok) {
        return;
      }
    } catch (e) {
      console.error(e);
      return;
    }
  }

  return (
    <ThemedView style={styles.main}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTeams}>
          {appStore.teamHome?.team.name} vs {appStore.teamVisitor?.team.name}
        </ThemedText>
        <ThemedText style={styles.headerScores}>
          {appStore.scoreHome} - {appStore.scoreVisitor}
        </ThemedText>
        <Timer
          onStartTimer={startTimer}
          onStopTimer={stopTimer}
          onEndHalfTime={handleEndHalfTime}
          onEndGame={handleEndGame}
          onQuitGame={handleQuitGame}
        />
      </ThemedView>
      <ThemedView style={styles.highlightsContainer}>
        {renderHighlightList(appStore.highlightsHome)}
        <View style={styles.verticalLine}></View>
        {renderHighlightList(appStore.highlightsVisitor)}
      </ThemedView>
      {appStore.status === 1 && (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.9}
          onPress={() => navigation.navigate("AddHighlight")}
        >
          <Text style={styles.buttonText}>Ajouter un temps-fort</Text>
        </TouchableOpacity>
      )}
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
    marginHorizontal: 16,
    marginBottom: 32,
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
