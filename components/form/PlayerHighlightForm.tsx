import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ThemedView } from "../ThemedView";
import { RadioGroup } from "react-native-radio-buttons-group";
import RNPickerSelect from "react-native-picker-select";
import useApplicationStore from "@/stores/ApplicationStore";
import { useMemo, useState } from "react";
import { TeamSideEnum } from "@/enums/TeamSideEnum";
import { customPickerStyles } from "@/styles/customPickerStyles";
import { commonStyles } from "@/styles/commonStyles";
import { ThemedText } from "../ThemedText";
import { isDisciplinaryHighlight } from "@/enums/DisciplinaryHighlightEnum";
import { PlayerHighlights } from "@/constants/PlayerHighlights";
import { PlayerHighlightType } from "@/types/PlayerHighlightType";

export default function PlayerHighlightForm({
  onSubmitForm,
}: {
  onSubmitForm: () => void;
}) {
  const GAME_DURATION_MINUTES = 80;
  const NUMBER_PLAYERS = 23;
  const appStore = useApplicationStore();
  const [selectedId, setSelectedId] = useState<string>("");
  const [highlightMinute, setHighlightMinute] = useState<number>(0);
  const [highlightId, setHighlightId] = useState<string>("");
  const [playerInvolved, setPlayerInvolved] = useState<number | undefined>();
  const [playerSubstituted, setPlayerSubstituted] = useState<
    number | undefined
  >();
  const [playerSubstitute, setPlayerSubstitute] = useState<
    number | undefined
  >();

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

  function buildHighlightTypeOptions(): Array<{
    label: string;
    value: string;
  }> {
    return [
      {
        label: "Carton jaune",
        value: "yellowCard",
      },
      {
        label: "Carton rouge",
        value: "redCard",
      },
      {
        label: "Remplacement",
        value: "substitution",
      },
    ];
  }

  function buildHighlightMinuteOptions(): Array<{
    label: string;
    value: string;
  }> {
    const options = [];
    for (let index = 1; index <= GAME_DURATION_MINUTES; index++) {
      options.push({ label: index.toString(), value: index.toString() });
    }

    return options;
  }

  function buildPlayersOptions(): Array<{ label: string; value: string }> {
    const options = [];
    for (let index = 1; index <= NUMBER_PLAYERS; index++) {
      options.push({ label: index.toString(), value: index.toString() });
    }

    return options;
  }

  function handleSubmit() {
    const team = radioButtons.find(
      (radioButton) => radioButton.id === selectedId
    );
    const playerHighlight: PlayerHighlightType | null =
      highlightId !== undefined ? PlayerHighlights[highlightId] : null;
    if (
      playerHighlight === null ||
      team === undefined ||
      highlightMinute === undefined
    )
      return;
    appStore.addHighlight(
      {
        id: playerHighlight.id,
        name: playerHighlight.label,
        minute: highlightMinute,
      },
      0,
      team.value
    );
    onSubmitForm();
  }
  console.log(highlightId, isDisciplinaryHighlight(highlightId));
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
        items={buildHighlightTypeOptions()}
        style={customPickerStyles}
      />
      <Text>{highlightId}</Text>
      {highlightId !== "substitution" ? (
        <RNPickerSelect
          placeholder={{ value: null, label: "Joueur sanctionné" }}
          onValueChange={(value) => setPlayerInvolved(value)}
          items={buildPlayersOptions()}
          style={customPickerStyles}
        />
      ) : (
        <>
          <RNPickerSelect
            placeholder={{ value: null, label: "Joueur remplacé" }}
            onValueChange={(value) => setPlayerInvolved(value)}
            items={buildPlayersOptions()}
            style={customPickerStyles}
          />
          <RNPickerSelect
            placeholder={{ value: null, label: "Joueur remplaçant" }}
            onValueChange={(value) => setHighlightId(value)}
            items={buildPlayersOptions()}
            style={customPickerStyles}
          />
        </>
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
