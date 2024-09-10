import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { highlightStyles } from "../../styles/highlightStyles";
import { DisciplinaryHighlightType } from "../../types/highlight/DisciplinaryHighlightType";

interface Props {
  highlight: DisciplinaryHighlightType;
}

export default function DisciplinaryHighlightItem({ highlight }: Props) {
  return (
    <ThemedView style={highlightStyles.highlightItem}>
      <ThemedText>
        {highlight.label} - {highlight.player}
      </ThemedText>
      <ThemedText>{highlight.minute}'</ThemedText>
    </ThemedView>
  );
}
