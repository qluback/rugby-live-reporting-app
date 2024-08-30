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

export default function Home({ navigation }: HomeScreenProps) {
  // const teamHome = useApplicationStore((state) => state.teamHome);
  // const teamVisitor = useApplicationStore((state) => state.teamVisitor);
  const appStore = useApplicationStore();
  const placeholder = {
    value: null,
    color: Colors.light.text,
  };
  const options = [
    { label: "Athis-Mons", value: "athis-mons" },
    { label: "Juvisy", value: "juvisy" },
    { label: "Lognes", value: "lognes" },
  ];
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.light.tint, dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/banner-ffr.png")}
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.formContainer}>
        <ThemedText style={styles.formTitle}>Équipes</ThemedText>
        <View style={styles.form}>
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
        </View>
      </View>
      {/* <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">
            app/(tabs)/index.tsxssb
          </ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView> */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
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
