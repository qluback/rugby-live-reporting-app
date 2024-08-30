import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useApplicationStore from "@/stores/ApplicationStore";
import { commonStyles } from "@/styles/commonStyles";
import { customPickerStyles } from "@/styles/customPickerStyles";
import { AddHighlightScreenProps } from "@/types/NavigationType";
import { useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import RadioGroup from "react-native-radio-buttons-group";

export default function AddHighlight({ navigation }: AddHighlightScreenProps) {
  const appStore = useApplicationStore();
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const teamOptions = [
    { label: appStore.teamHome, value: appStore.teamHome },
    { label: appStore.teamVisitor, value: appStore.teamVisitor },
  ];
  const radioButtons = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: appStore.teamHome,
        value: appStore.teamHome,
        color: "#002A61",
        labelStyle: {color: "#002A61"},
      },
      {
        id: "2",
        label: appStore.teamVisitor,
        value: appStore.teamVisitor,
        color: "#002A61",
        labelStyle: {color: "#002A61"},
      },
    ],
    []
  );
  const highlightTypeOptions = [
    { label: "Try", value: "Try" },
    { label: "Converted try", value: "Converted try" },
    { label: "Penalty try", value: "Penalty try" },
    { label: "Penalty kick", value: "Penalty kick" },
    { label: "Drop goal", value: "Drop goal" },
  ];

  function handleSubmit() {
    navigation.navigate("GameOverview");
  }

  return (
    <ThemedView style={styles.formContainer}>
      <RadioGroup
      containerStyle={{flexDirection: "row"}}
        radioButtons={radioButtons}
        onPress={setSelectedId}
        selectedId={selectedId}
      />
      {/* <RNPickerSelect
        placeholder={{ value: null, label: "Nom de l'équipe" }}
        onValueChange={(value) => console.log(value)}
        items={teamOptions}
        style={customPickerStyles}
      /> */}
      <RNPickerSelect
        placeholder={{ value: null, label: "Type de temps-fort" }}
        onValueChange={(value) => console.log(value)}
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
