import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AddHighlightScreenProps } from "@/types/NavigationType";

export default function AddHighlight({navigation}: AddHighlightScreenProps) {
  return (
    <ThemedView>
      <ThemedText>Test</ThemedText>
    </ThemedView>
  );
}