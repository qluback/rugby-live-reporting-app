import { Colors } from "../constants/Colors";
import { StyleSheet } from "react-native";

export const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    color: Colors.light.text,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "blue",
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});