import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  View,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import RNPickerSelect from "react-native-picker-select";
import { HomeScreenProps } from "@/types/NavigationType";
import useApplicationStore from "@/stores/ApplicationStore";
import { ThemedView } from "@/components/ThemedView";

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
          <RNPickerSelect
            placeholder={{ ...placeholder, label: "Domicile" }}
            onValueChange={(value) => appStore.setTeamHome(value)}
            items={options}
            style={customPickerStyles}
          />
          <RNPickerSelect
            placeholder={{ ...placeholder, label: "Visiteur" }}
            onValueChange={(value) => appStore.setTeamVisitor(value)}
            items={options}
            style={customPickerStyles}
          />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("GameOverview")}
          >
            <Text style={styles.buttonText}>Valider</Text>
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
  button: {
    backgroundColor: "#002A61",
    padding: 16,
    // borderRadius: 8
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold"
  },
  formContainer: {
    gap: 16
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  form: {
    gap: 16,
  },
});

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    // borderRadius: 8,
    color: Colors.light.text,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "blue",
    // borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
