import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { highlightStyles } from "../../styles/highlightStyles";
import { SubstitutionHighlightType } from "../../types/highlight/SubstitutionHighlightType";
import SubstituteIcon from "../icons/SubstituteIcon";

interface Props {
  highlight: SubstitutionHighlightType;
}

export default function SubstitutionHighlightItem({ highlight }: Props) {
  return (
    <ThemedView style={highlightStyles.highlightItem}>
      <ThemedView
        style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
      >
        <ThemedText>{highlight.playerSubstituted}</ThemedText>
        <SubstituteIcon />
        <ThemedText>{highlight.playerSubstitute}</ThemedText>
      </ThemedView>
      <ThemedText>{highlight.minute}'</ThemedText>
    </ThemedView>
  );
}
