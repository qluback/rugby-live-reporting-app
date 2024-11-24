import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import useApplicationStore from "../stores/ApplicationStore";
import { StyleSheet, TouchableOpacity } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { Game } from "../constants/Game";

interface Props {
  onStartTimer: () => void;
  onStopTimer: () => void;
  onEndHalfTime: () => void;
  onEndGame: () => void;
  onQuitGame: () => void;
}

export default function Timer({
  onStartTimer,
  onStopTimer,
  onEndHalfTime,
  onEndGame,
  onQuitGame,
}: Props) {
  const appStore = useApplicationStore();

  function formatTimer() {
    const minutes = Math.floor(appStore.timerSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (appStore.timerSeconds % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  }

  function isStartOfFirstHalfTime(): boolean {
    return appStore.halfTime === 1 && appStore.timerSeconds === 0;
  }

  function isStartOfSecondHalfTime(): boolean {
    return (
      appStore.halfTime === 2 &&
      appStore.timerSeconds === Game.durationHalfTimeInSeconds
    );
  }

  function renderStopGameButton() {
    if (
      !appStore.timerOn &&
      (isStartOfFirstHalfTime() ||
        isStartOfSecondHalfTime() ||
        appStore.status === Game.status.finished)
    ) {
      return (
        <TouchableOpacity
          style={[commonStyles.button, styles.buttonStop]}
          activeOpacity={0.9}
          onPress={onQuitGame}
        >
          <ThemedText style={commonStyles.buttonText}>Quitter</ThemedText>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={[commonStyles.button, styles.buttonStop]}
        activeOpacity={0.9}
        onPress={appStore.halfTime === 1 ? onEndHalfTime : onEndGame}
      >
        <ThemedText style={commonStyles.buttonText}>
          {appStore.halfTime === 1 ? "Fin MT" : "Fin match"}
        </ThemedText>
      </TouchableOpacity>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {appStore.status === 2 ? (
        <ThemedText style={styles.text}>
          Match terminé
        </ThemedText>
      ) : (
        <ThemedText style={styles.text}>
          {appStore.halfTime === 1 ? "1ère" : "2ème"} MT : {formatTimer()}
        </ThemedText>
      )}

      <ThemedView style={styles.actions}>
        {renderStopGameButton()}
        {appStore.status !== Game.status.finished && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={appStore.timerOn ? onStopTimer : onStartTimer}
            style={[
              commonStyles.button,
              appStore.timerOn
                ? { backgroundColor: "lightgreen" }
                : { backgroundColor: "green" },
            ]}
          >
            <ThemedText style={commonStyles.buttonText}>
              {appStore.timerOn ? "Pause" : "Démarrer"}
            </ThemedText>
          </TouchableOpacity>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
  text: {
    textAlign: "center",
    color: "#FFFFFF",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    backgroundColor: "#002A61",
    marginTop: 16,
  },
  buttonStart: {
    backgroundColor: "green",
  },
  buttonStop: {
    backgroundColor: "red",
  },
});
