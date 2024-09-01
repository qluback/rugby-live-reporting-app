import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TeamSideEnum } from "@/enums/TeamSideEnum";
import useApplicationStore from "@/stores/ApplicationStore";
import { commonStyles } from "@/styles/commonStyles";
import { customPickerStyles } from "@/styles/customPickerStyles";
import { AddHighlightScreenProps } from "@/types/NavigationType";
import { useMemo, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import RadioGroup from "react-native-radio-buttons-group";

export default function AddHighlight({ navigation }: AddHighlightScreenProps) {
  const GAME_DURATION_MINUTES = 80;
  const appStore = useApplicationStore();
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [highlightMinute, setHighlightMinute] = useState<number|undefined>();
  const [highlightName, setHighlightName] = useState<string|undefined>();

  const radioButtons = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: appStore.teamHome,
        value: TeamSideEnum.HOME,
        color: "#002A61",
        labelStyle: { color: "#002A61" },
      },
      {
        id: "2",
        label: appStore.teamVisitor,
        value: TeamSideEnum.VISITOR,
        color: "#002A61",
        labelStyle: { color: "#002A61" },
      },
    ],
    []
  );
  const highlightTypeOptions = [
    { label: "Essai", value: "Essai" },
    { label: "Essai transformé", value: "Essai transformé" },
    { label: "Essai de pénalité", value: "Essai de pénalité" },
    { label: "Pénalité", value: "Pénalité" },
    { label: "Drop", value: "Drop" },
  ];

  function buildHighlightMinuteOptions() {
    const options = [];
    for (let index = 1; index <= GAME_DURATION_MINUTES; index++) {
      options.push({label: index.toString(), value: index.toString()});
    }

    return options;
  }

  function handleSubmit() {
    const team = radioButtons.find((radioButton) => radioButton.id === selectedId);
    if (highlightName === undefined || team === undefined || highlightMinute === undefined) return;

    appStore.updateHighlights({name: highlightName, minute: highlightMinute}, team.value);
    navigation.navigate("GameOverview");
  }

  return (
    <ThemedView style={styles.formContainer}>
      <RadioGroup
        layout="row"
        radioButtons={radioButtons}
        onPress={setSelectedId}
        selectedId={selectedId}
      />
      <RNPickerSelect
        placeholder={{ value: null, label: "Minute" }}
        onValueChange={(value) => setHighlightMinute(value)}
        items={buildHighlightMinuteOptions()}
        style={customPickerStyles}
      />
      <RNPickerSelect
        placeholder={{ value: null, label: "Type de temps-fort" }}
        onValueChange={(value) => setHighlightName(value)}
        items={highlightTypeOptions}
        style={customPickerStyles}
      />
      <TouchableOpacity
        style={commonStyles.button}
        activeOpacity={0.9}
        onPress={handleSubmit}
      >
        <ThemedText style={commonStyles.buttonText}>Valider</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    height: "100%",
    padding: 16,
    gap: 16,
  },
});
