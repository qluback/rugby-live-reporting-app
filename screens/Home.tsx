import { Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import RNPickerSelect from "react-native-picker-select";
import { HomeScreenProps } from "@/types/NavigationType";
import useApplicationStore from "@/stores/ApplicationStore";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { customPickerStyles } from "@/styles/customPickerStyles";
import { commonStyles } from "@/styles/commonStyles";

export default function Home({ navigation }: HomeScreenProps) {
  // const teamHome = useApplicationStore((state) => state.teamHome);
  // const teamVisitor = useApplicationStore((state) => state.teamVisitor);
  const appStore = useApplicationStore();
  const placeholder = {
    value: null,
    color: Colors.light.text,
  };
  const options = [
    { label: "Athis-Mons", value: "Athis-Mons" },
    { label: "Juvisy", value: "Juvisy" },
    { label: "Lognes", value: "Lognes" },
  ];
  const [errors, setErrors] = useState({
    errorTeamHome: false,
    errorTeamVisitor: false,
  });

  function handleSubmit() {
    setErrors({
      errorTeamHome: appStore.teamHome === "",
      errorTeamVisitor: appStore.teamVisitor === "",
    });
    if (appStore.teamHome === "" || appStore.teamVisitor === "") return;

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
              onValueChange={(value) => appStore.setTeamHome(value)}
              items={options}
              style={customPickerStyles}
              value={appStore.teamHome !== "" ? appStore.teamHome : null}
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
              onValueChange={(value) => appStore.setTeamVisitor(value)}
              items={options}
              style={customPickerStyles}
              value={appStore.teamVisitor !== "" ? appStore.teamVisitor : null}
            />
            {errors.errorTeamVisitor && (
              <ThemedText style={commonStyles.errorMessage}>
                Veuillez renseigner l'équipe visiteuse
              </ThemedText>
            )}
          </ThemedView>
          <TouchableOpacity
            style={commonStyles.button}
            activeOpacity={0.9}
            onPress={handleSubmit}
          >
            <Text style={commonStyles.buttonText}>Valider</Text>
          </TouchableOpacity>
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
