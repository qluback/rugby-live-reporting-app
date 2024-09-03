import { StyleSheet, TouchableOpacity } from "react-native";
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
import { OptionTeamProps } from "@/interfaces/OptionsTeamProps";
import { PlayerHighlightDataProps } from "@/interfaces/PlayerHighlightDataProps";
import ErrorMessage from "./ErrorMessage";

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
  const [selectedTeamSide, setSelectedTeamSide] = useState<string>("");
  const [highlightMinute, setHighlightMinute] = useState<number>(0);
  const [highlightId, setHighlightId] = useState<string>("");
  const [playerInvolved, setPlayerInvolved] = useState<number>(0);
  const [playerSubstituted, setPlayerSubstituted] = useState<number>(0);
  const [playerSubstitute, setPlayerSubstitute] = useState<number>(0);
  const [errors, setErrors] = useState({
    errorTeamSide: false,
    errorHighlightId: false,
    errorHighlightMinute: false,
    errorPlayerInvolved: false,
    errorPlayerSubstituted: false,
    errorPlayerSubstitute: false,
  });

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
        label: PlayerHighlights.yellowCard.label,
        value: PlayerHighlights.yellowCard.id,
      },
      {
        label: PlayerHighlights.redCard.label,
        value: PlayerHighlights.redCard.id,
      },
      {
        label: PlayerHighlights.substitution.label,
        value: PlayerHighlights.substitution.id,
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

  function handleChangeHighlightType(highlightId: string) {
    setHighlightId(highlightId);
    setPlayerInvolved(0);
    setPlayerSubstituted(0);
    setPlayerSubstitute(0);
  }

  function displayPlayerFields() {
    if (isDisciplinaryHighlightId(highlightId)) {
      return (
        <>
          <RNPickerSelect
            placeholder={{ value: 0, label: "Joueur sanctionné" }}
            onValueChange={(value) => setPlayerInvolved(value)}
            items={buildPlayersOptions()}
            style={customPickerStyles}
            value={playerInvolved}
          />
          {errors.errorPlayerInvolved && (
            <ErrorMessage>
              Veuillez renseigner le joueur sanctionné
            </ErrorMessage>
          )}
        </>
      );
    }

    if (isSubstitutionHighlightId(highlightId)) {
      return (
        <>
          <RNPickerSelect
            placeholder={{ value: 0, label: "Joueur remplacé" }}
            onValueChange={(value) => setPlayerSubstituted(value)}
            items={buildPlayersOptions()}
            style={customPickerStyles}
            value={playerSubstituted}
          />
          {errors.errorPlayerSubstituted && (
            <ErrorMessage>
              Veuillez renseigner le joueur remplacé
            </ErrorMessage>
          )}
          <RNPickerSelect
            placeholder={{ value: 0, label: "Joueur remplaçant" }}
            onValueChange={(value) => setPlayerSubstitute(value)}
            items={buildPlayersOptions()}
            style={customPickerStyles}
            value={playerSubstitute}
          />
          {errors.errorPlayerSubstitute && (
            <ErrorMessage>
              Veuillez renseigner le joueur remplaçant
            </ErrorMessage>
          )}
        </>
      );
    }

    return <></>;
  }

  function isFormValid(
    team: OptionTeamProps | undefined,
    highlight: PlayerHighlightDataProps | null,
    minute: number
  ): boolean {
    const errorsUpdated = {
      errorTeamSide: team === undefined,
      errorHighlightId: highlight === null,
      errorHighlightMinute: minute === 0,
      errorPlayerInvolved:
        highlight !== null &&
        isDisciplinaryHighlightId(highlight.id) &&
        playerInvolved === 0,
      errorPlayerSubstituted:
        highlight !== null &&
        isSubstitutionHighlightId(highlight.id) &&
        playerSubstituted === 0,
      errorPlayerSubstitute:
        highlight !== null &&
        isSubstitutionHighlightId(highlight.id) &&
        playerSubstitute === 0,
    };
    setErrors(errorsUpdated);

    return Object.values(errorsUpdated).every((item) => item === false);
  }

  function handleSubmit() {
    const team = radioButtons.find(
      (radioButton) => radioButton.id === selectedTeamSide
    );
    const playerHighlightData: PlayerHighlightDataProps | null =
      highlightId !== "" ? PlayerHighlights[highlightId] : null;

    if (!isFormValid(team, playerHighlightData, highlightMinute)) return;

    if (isDisciplinaryHighlightId(highlightId)) {
      // if (playerInvolved === null) return;

      appStore.addPlayerHighlight(
        {
          id: playerHighlightData!.id,
          label: playerHighlightData!.label,
          player: playerInvolved,
          minute: highlightMinute,
        },
        team!.value
      );
    } else {
      // if (playerSubstituted === null || playerSubstitute === null) return;

      appStore.addPlayerHighlight(
        {
          id: playerHighlightData!.id,
          label: playerHighlightData!.label,
          playerSubstituted: playerSubstituted,
          playerSubstitute: playerSubstitute,
          minute: highlightMinute,
        },
        team!.value
      );
    }

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
        placeholder={{ value: null, label: "Minute" }}
        onValueChange={(value) => setHighlightMinute(value)}
        items={buildHighlightMinuteOptions()}
        style={customPickerStyles}
      />
      {errors.errorHighlightMinute && (
        <ErrorMessage>Veuillez renseigner la minute</ErrorMessage>
      )}
      <RNPickerSelect
        placeholder={{ value: null, label: "Type de temps-fort" }}
        onValueChange={(value) => handleChangeHighlightType(value)}
        items={buildHighlightTypeOptions()}
        style={customPickerStyles}
      />
      {errors.errorHighlightId && (
        <ErrorMessage>Veuillez renseigner un temps-fort</ErrorMessage>
      )}
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
