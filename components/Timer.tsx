import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import useApplicationStore from "@/stores/ApplicationStore";
import { StyleSheet, TouchableOpacity } from "react-native";
import { commonStyles } from "@/styles/commonStyles";

interface Props {
  onStartTimer: () => void;
  onStopTimer: () => void;
  onQuitGame: () => void;
}

export default function Timer({
  onStartTimer,
  onStopTimer,
  onQuitGame,
}: Props) {
  const appStore = useApplicationStore();

  function formatTimer() {
    console.log("format", appStore.timerSeconds);
    const minutes = Math.floor(appStore.timerSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (appStore.timerSeconds % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>1ère MT : {formatTimer()}</ThemedText>
      <ThemedView style={styles.actions}>
        {/* {!appStore.timerOn && ( */}
          <TouchableOpacity
            style={[commonStyles.button, styles.buttonStop]}
            activeOpacity={0.9}
            onPress={onQuitGame}
          >
            <ThemedText style={commonStyles.buttonText}>Quitter</ThemedText>
          </TouchableOpacity>
        {/* )} */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={appStore.timerOn ? onStopTimer : onStartTimer}
          style={[commonStyles.button, appStore.timerOn ? {backgroundColor: "lightgreen"} : {backgroundColor: "green"}]}
        >
          <ThemedText style={commonStyles.buttonText}>
            {appStore.timerOn ? "Pause" : "Démarrer"}
          </ThemedText>
        </TouchableOpacity>
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
    marginTop: 16
  },
  buttonStart: {
    backgroundColor: "green",
  },
  buttonStop: {
    backgroundColor: "red",
  }
});
