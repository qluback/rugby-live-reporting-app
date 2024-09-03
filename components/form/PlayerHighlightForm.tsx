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
import { isDisciplinaryHighlightId } from "@/enums/DisciplinaryHighlightEnum";
import { PlayerHighlights } from "@/constants/PlayerHighlights";
import { isSubstitutionHighlightId } from "@/enums/SubstitutionHighlightEnum";

interface OptionsProps {
  label: string;
  value: string;
}

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
  const [playerInvolved, setPlayerInvolved] = useState<number | null>(null);
  const [playerSubstituted, setPlayerSubstituted] = useState<number | null>(
    null
  );
  const [playerSubstitute, setPlayerSubstitute] = useState<number | null>(null);

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
    [appStore.teamHome, appStore.teamVisitor]
  );

  function buildHighlightTypeOptions(): OptionsProps[] {
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

  function buildHighlightMinuteOptions(): OptionsProps[] {
    const options = [];
    for (let index = 1; index <= GAME_DURATION_MINUTES; index++) {
      options.push({ label: index.toString(), value: index.toString() });
    }

    return options;
  }

  function buildPlayersOptions(): OptionsProps[] {
    const options = [];
    for (let index = 1; index <= NUMBER_PLAYERS; index++) {
      options.push({ label: index.toString(), value: index.toString() });
    }

    return options;
  }

  function displayPlayerFields() {
    if (isDisciplinaryHighlightId(highlightId)) {
      return (
        <RNPickerSelect
          placeholder={{ value: null, label: "Joueur sanctionné" }}
          onValueChange={(value) => setPlayerInvolved(value)}
          items={buildPlayersOptions()}
          style={customPickerStyles}
        />
      );
    }

    if (isSubstitutionHighlightId(highlightId)) {
      return (
        <>
          <RNPickerSelect
            placeholder={{ value: null, label: "Joueur remplacé" }}
            onValueChange={(value) => setPlayerSubstituted(value)}
            items={buildPlayersOptions()}
            style={customPickerStyles}
          />
          <RNPickerSelect
            placeholder={{ value: null, label: "Joueur remplaçant" }}
            onValueChange={(value) => setPlayerSubstitute(value)}
            items={buildPlayersOptions()}
            style={customPickerStyles}
          />
        </>
      );
    }

    return <></>;
  }

  function handleSubmit() {
    const team = radioButtons.find(
      (radioButton) => radioButton.id === selectedId
    );
    const playerHighlight: { id: string; label: string } | null =
      highlightId !== undefined ? PlayerHighlights[highlightId] : null;
    if (
      playerHighlight === null ||
      team === undefined ||
      highlightMinute === undefined
    )
      return;

    if (isDisciplinaryHighlightId(highlightId)) {
      if (playerInvolved === null) return;

      appStore.addPlayerHighlight(
        {
          id: playerHighlight.id,
          label: playerHighlight.label,
          player: playerInvolved,
          minute: highlightMinute,
        },
        team.value
      );
    } else {
      if (playerSubstituted === null || playerSubstitute === null) return;

      appStore.addPlayerHighlight(
        {
          id: playerHighlight.id,
          label: playerHighlight.label,
          playerSubstituted: playerSubstituted,
          playerSubstitute: playerSubstitute,
          minute: highlightMinute,
        },
        team.value
      );
    }

    onSubmitForm();
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
        items={buildHighlightTypeOptions()}
        style={customPickerStyles}
      />
      {displayPlayerFields()}
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
