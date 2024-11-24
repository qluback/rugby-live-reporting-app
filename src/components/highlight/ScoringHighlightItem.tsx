import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { highlightStyles } from "../../styles/highlightStyles";
import { ScoringHighlightType } from "../../types/highlight/ScoringHighlightType";

interface Props {
  highlight: ScoringHighlightType;
}

export default function ScoringHighlightItem({ highlight }: Props) {
  return (
    <ThemedView style={highlightStyles.highlightItem}>
      <ThemedText>{highlight.label}</ThemedText>
      <ThemedText>{highlight.minute}'</ThemedText>
    </ThemedView>
  );
}
