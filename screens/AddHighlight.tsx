import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScoringHighlights } from "@/constants/ScoringHighlights";
import { TeamSideEnum } from "@/enums/TeamSideEnum";
import useApplicationStore from "@/stores/ApplicationStore";
import { commonStyles } from "@/styles/commonStyles";
import { customPickerStyles } from "@/styles/customPickerStyles";
import { AddHighlightScreenProps } from "@/types/NavigationType";
import { ScoringHighlightType } from "@/types/ScoringHighlightType";
import { useMemo, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import RadioGroup from "react-native-radio-buttons-group";

export default function AddHighlight({ navigation }: AddHighlightScreenProps) {
  const GAME_DURATION_MINUTES = 80;
  const appStore = useApplicationStore();
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [highlightMinute, setHighlightMinute] = useState<number | undefined>();
  const [highlightId, setHighlightId] = useState<string | undefined>();

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
    { label: ScoringHighlights.try.label, value: ScoringHighlights.try.id },
    {
      label: ScoringHighlights.convertedTry.label,
      value: ScoringHighlights.convertedTry.id,
    },
    {
      label: ScoringHighlights.penaltyTry.label,
      value: ScoringHighlights.penaltyTry.id,
    },
    {
      label: ScoringHighlights.penalty.label,
      value: ScoringHighlights.penalty.id,
    },
    {
      label: ScoringHighlights.dropGoal.label,
      value: ScoringHighlights.dropGoal.id,
    },
  ];

  function buildHighlightMinuteOptions() {
    const options = [];
    for (let index = 1; index <= GAME_DURATION_MINUTES; index++) {
      options.push({ label: index.toString(), value: index.toString() });
    }

    return options;
  }

  function handleSubmit() {
    const team = radioButtons.find(
      (radioButton) => radioButton.id === selectedId
    );
    const scoringHighlight: ScoringHighlightType | undefined =
      highlightId !== undefined ? ScoringHighlights[highlightId] : undefined;
    if (
      scoringHighlight === undefined ||
      team === undefined ||
      highlightMinute === undefined
    )
      return;

    appStore.addHighlight(
      { name: scoringHighlight.label, minute: highlightMinute },
      scoringHighlight.points,
      team.value
    );
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
        onValueChange={(value) => setHighlightId(value)}
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
