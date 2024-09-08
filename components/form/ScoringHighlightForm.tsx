import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "../ThemedView";
import { RadioGroup } from "react-native-radio-buttons-group";
import RNPickerSelect from "react-native-picker-select";
import { ScoringHighlights } from "@/constants/ScoringHighlights";
import useApplicationStore from "@/stores/ApplicationStore";
import { useMemo, useState } from "react";
import { TeamSideEnum } from "@/enums/TeamSideEnum";
import { customPickerStyles } from "@/styles/customPickerStyles";
import { commonStyles } from "@/styles/commonStyles";
import { ThemedText } from "../ThemedText";
import { OptionTeamProps } from "@/interfaces/OptionsTeamProps";
import { ScoringHighlightDataProps } from "@/interfaces/ScoringHighlightDataProps";
import ErrorMessage from "./ErrorMessage";
import { Game } from "@/constants/Game";

export default function ScoringHighlightForm({
  onSubmitForm,
}: {
  onSubmitForm: () => void;
}) {
  const appStore = useApplicationStore();
  const [selectedTeamSide, setSelectedTeamSide] = useState<string>("");
  const [highlightMinute, setHighlightMinute] = useState<number>(appStore.getCurrentTimerMinute());
  const [highlightId, setHighlightId] = useState<string>("");
  const [errors, setErrors] = useState({
    errorTeamSide: false,
    errorHighlightId: false,
    errorHighlightMinute: false,
  });

  const radioButtons: OptionTeamProps[] = useMemo(
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
    [appStore.teamHome, appStore.teamVisitor]
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
    for (let index = 1; index <= Game.durationMinutes; index++) {
      options.push({ label: index.toString(), value: index.toString() });
    }

    return options;
  }

  function isFormValid(
    team: OptionTeamProps | undefined,
    highlight: ScoringHighlightDataProps | null,
    minute: number
  ): boolean {
    const errorsUpdated = {
      errorTeamSide: team === undefined,
      errorHighlightId: highlight === null,
      errorHighlightMinute: minute === 0,
    };
    setErrors(errorsUpdated);

    return Object.values(errorsUpdated).every((item) => item === false);
  }

  function handleSubmit() {
    const team = radioButtons.find(
      (radioButton) => radioButton.id === selectedTeamSide
    );
    const scoringHighlightData: ScoringHighlightDataProps | null =
      highlightId !== "" ? ScoringHighlights[highlightId] : null;

    if (!isFormValid(team, scoringHighlightData, highlightMinute)) return;

    appStore.addScoringHighlight(
      {
        id: scoringHighlightData!.id,
        label: scoringHighlightData!.label,
        minute: highlightMinute!,
        points: scoringHighlightData!.points,
      },
      team!.value
    );

    onSubmitForm();
  }

  return (
    <ThemedView style={styles.formContainer}>
      <RadioGroup
        layout="row"
        radioButtons={radioButtons}
        onPress={setSelectedTeamSide}
        selectedId={selectedTeamSide}
      />
      {errors.errorTeamSide && (
        <ErrorMessage>Veuillez renseigner l'équipe</ErrorMessage>
      )}
      <RNPickerSelect
        placeholder={{ value: 0, label: "Minute" }}
        onValueChange={(value) => setHighlightMinute(parseInt(value))}
        items={buildHighlightMinuteOptions()}
        style={customPickerStyles}
        value={appStore.getCurrentTimerMinute()}
      />
      {errors.errorHighlightMinute && (
        <ErrorMessage>Veuillez renseigner la minute</ErrorMessage>
      )}
      <RNPickerSelect
        placeholder={{ value: null, label: "Type de temps-fort" }}
        onValueChange={(value) => setHighlightId(value)}
        items={highlightTypeOptions}
        style={customPickerStyles}
      />
      {errors.errorHighlightId && (
        <ErrorMessage>Veuillez renseigner un temps-fort</ErrorMessage>
      )}
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
