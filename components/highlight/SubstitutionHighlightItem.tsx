import Svg, { Path } from "react-native-svg";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { highlightStyles } from "../../styles/highlightStyles";
import { SubstitutionHighlightType } from "../../types/highlight/SubstitutionHighlightType";

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
        <Svg
          width="20px"
          height="20px"
          viewBox="0 0 16 16"
          style={{ marginHorizontal: 1 }}
        >
          <Path
            fill="#002A61"
            fill-rule="evenodd"
            d="M11.297115,8.29289 C11.687615,7.90237 12.320815,7.90237 12.711315,8.29289 L15.418415,11 L12.711315,13.7071 C12.320815,14.0976 11.687615,14.0976 11.297115,13.7071 C10.906615,13.3166 10.906615,12.6834 11.297115,12.2929 L11.590015,12 L2.004215,12 C1.451925,12 1.004215,11.5523 1.004215,11 C1.004215,10.4477 1.451925,10 2.004215,10 L11.590015,10 L11.297115,9.70711 C10.906615,9.31658 10.906615,8.68342 11.297115,8.29289 Z M3.297105,2.29289 C3.687635,1.90237 4.320795,1.90237 4.711325,2.29289 C5.101845,2.68342 5.101845,3.31658 4.711325,3.70711 L4.418425,4 L14.004215,4 C14.556515,4 15.004215,4.44772 15.004215,5 C15.004215,5.55229 14.556515,6 14.004215,6 L4.418425,6 L4.711325,6.29289 C5.101845,6.68342 5.101845,7.31658 4.711325,7.70711 C4.320795,8.09763 3.687635,8.09763 3.297105,7.70711 L0.59,5 L3.297105,2.29289 Z"
          />
        </Svg>
        <ThemedText>{highlight.playerSubstitute}</ThemedText>
      </ThemedView>
      <ThemedText>{highlight.minute}'</ThemedText>
    </ThemedView>
  );
}
