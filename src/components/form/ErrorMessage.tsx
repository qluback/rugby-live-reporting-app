import { commonStyles } from "../../styles/commonStyles";
import { ThemedText } from "../ThemedText";

interface ErrorMessageProps { children: string };

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return <ThemedText style={commonStyles.errorMessage}>{children}</ThemedText>;
}
