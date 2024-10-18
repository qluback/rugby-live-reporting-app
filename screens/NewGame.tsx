import { Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import ParallaxScrollView from "../components/ParallaxScrollView";
import { ThemedText } from "../components/ThemedText";
import { Colors } from "../constants/Colors";
import RNPickerSelect from "react-native-picker-select";
import { NewGameScreenProps } from "../types/NavigationType";
import useApplicationStore from "../stores/ApplicationStore";
import { ThemedView } from "../components/ThemedView";
import { useEffect, useState } from "react";
import { customPickerStyles } from "../styles/customPickerStyles";
import { commonStyles } from "../styles/commonStyles";
import { TeamSideEnum } from "../enums/TeamSideEnum";
import { TeamDto } from "../dto/TeamDto";
import { TeamType } from "../types/TeamType";

export default function NewGame({ navigation }: NewGameScreenProps) {
  const appStore = useApplicationStore();
  const placeholder = {
    value: null,
    color: Colors.light.text,
  };
  const [teamsAvailable, setTeamsAvailable] = useState<TeamType[]>([]);
  const [teamHome, setTeamHome] = useState<TeamType | null>(null);
  const [teamVisitor, setTeamVisitor] = useState<TeamType | null>(null);

  const [errors, setErrors] = useState({
    errorTeamHome: false,
    errorTeamVisitor: false,
    errorSameTeam: false,
    errorPostRequest: false,
  });

  async function getTeams() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/teams");
      const data: TeamDto[] = await response.json();

      const transformedTeams: TeamType[] = [];
      data.map((team) => {
        transformedTeams.push(team);
      });

      setTeamsAvailable(transformedTeams);
    } catch (e) {
      setTeamsAvailable([]);
    }
  }

  useEffect(() => {
    getTeams();
  }, []);

  function buildTeamOptions() {
    const options: { label: string; value: number }[] = [];
    teamsAvailable.map((team) => {
      options.push({ label: team.name, value: team.id });
    });

    return options;
  }

  function handleSelectTeam(id: number, side: TeamSideEnum) {
    const team: TeamType | undefined = teamsAvailable.find(
      (team) => team.id === id
    );

    if (team === undefined) return;

    // appStore.setTeam(team, side);
    if (side === TeamSideEnum.HOME) {
      setTeamHome(team);
    } else {
      setTeamVisitor(team);
    }

    return;
  }

  async function handleSubmit() {
    let errorsUpdated = {
      errorTeamHome: teamHome === null,
      errorTeamVisitor: teamVisitor === null,
      errorSameTeam:
        teamHome !== null &&
        teamVisitor !== null &&
        teamHome === teamVisitor,
      errorPostRequest: false,
    };

    if (!errorsUpdated.errorTeamHome && !errorsUpdated.errorTeamVisitor) {
      errorsUpdated = {
        ...errorsUpdated,
        errorSameTeam:
          teamHome !== null &&
          teamVisitor !== null &&
          teamHome === teamVisitor,
      };
    }

    setErrors(errorsUpdated);

    if (!Object.values(errorsUpdated).every((item) => item === false)) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/games", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamHome: teamHome!.id,
          teamVisitor: teamVisitor!.id,
        }),
      });

      if (!response.ok) {
        setErrors((prevErrors) => ({ ...prevErrors, errorPostRequest: true }));

        return;
      }

      const responseDecoded = await response.json();
      appStore.setGame(responseDecoded.data);
    } catch (e) {
      setErrors((prevErrors) => ({ ...prevErrors, errorPostRequest: true }));

      return;
    }

    navigation.navigate("GameOverview");
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.light.tint, dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/banner-ffr.png")}
          style={styles.logo}
        />
      }
    >
      <ThemedView style={styles.formContainer}>
        <ThemedText style={styles.formTitle}>Équipes</ThemedText>
        <ThemedView style={styles.form}>
          <ThemedView>
            <RNPickerSelect
              placeholder={{ ...placeholder, label: "Domicile" }}
              onValueChange={(value) =>
                handleSelectTeam(parseInt(value), TeamSideEnum.HOME)
              }
              items={buildTeamOptions()}
              style={customPickerStyles}
              value={teamHome !== null ? teamHome.id : null}
            />
            {errors.errorTeamHome && (
              <ThemedText style={commonStyles.errorMessage}>
                Veuillez renseigner l'équipe à domicile
              </ThemedText>
            )}
          </ThemedView>
          <ThemedView>
            <RNPickerSelect
              placeholder={{ ...placeholder, label: "Visiteur" }}
              onValueChange={(value) =>
                handleSelectTeam(parseInt(value), TeamSideEnum.VISITOR)
              }
              items={buildTeamOptions()}
              style={customPickerStyles}
              value={
                teamVisitor !== null ? teamVisitor.id : null
              }
            />
            {errors.errorTeamVisitor && (
              <ThemedText style={commonStyles.errorMessage}>
                Veuillez renseigner l'équipe visiteuse
              </ThemedText>
            )}
          </ThemedView>
          {errors.errorSameTeam && (
            <ThemedText style={commonStyles.errorMessage}>
              Veuillez sélectionner deux équipes différentes
            </ThemedText>
          )}
          <TouchableOpacity
            style={commonStyles.button}
            activeOpacity={0.9}
            onPress={handleSubmit}
          >
            <Text style={commonStyles.buttonText}>Valider</Text>
          </TouchableOpacity>
          {errors.errorPostRequest && (
            <ThemedText style={commonStyles.errorMessage}>
              Une erreur est survenue lors de la création du match. Veuillez
              réessayer ultérieurement.
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  formContainer: {
    gap: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  form: {
    gap: 16,
  },
});
