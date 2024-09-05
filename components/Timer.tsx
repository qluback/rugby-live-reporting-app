import { useEffect, useState } from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import useApplicationStore from "@/stores/ApplicationStore";
import { TouchableOpacity } from "react-native";
import { commonStyles } from "@/styles/commonStyles";

export default function Timer() {
  const appStore = useApplicationStore();
  const [timerInterval, setTimerInterval] = useState<
    ReturnType<typeof setInterval> | undefined
  >();

  const startTimer = () => {
    console.log("start clicked");
    clearInterval(timerInterval);
    appStore.setTimerOn(true);
    setTimerInterval(
      setInterval(() => {
        appStore.setTimerSeconds();
      }, 1000)
    );
  };

  const stopTimer = () => {
    console.log("paused clicked");
    clearTimeout(timerInterval);
    appStore.setTimerOn(false);
  };

  function formatTimerSeconds() {
    let minutes = Math.floor(appStore.timerSeconds / 60);
    let seconds = appStore.timerSeconds % 60;
    console.log(minutes, seconds);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <ThemedView style={{ backgroundColor: "red" }}>
      <ThemedText>Timer : {formatTimerSeconds()}</ThemedText>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={appStore.timerOn ? stopTimer : startTimer}
        style={[commonStyles.button, { backgroundColor: "green" }]}
      >
        <ThemedText style={commonStyles.buttonText}>
          {appStore.timerOn ? "Pause" : "Démarrer"}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}
