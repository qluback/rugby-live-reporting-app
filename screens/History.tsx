import { Image, StyleSheet, Text } from "react-native";
import ParallaxScrollView from "../components/ParallaxScrollView";
import { ThemedText } from "../components/ThemedText";
import { Colors } from "../constants/Colors";
import { HistoryScreenProps } from "../types/NavigationType";
import { useEffect, useState } from "react";
import { GameType } from "../types/GameType";
import { GameDto } from "../dto/GameDto";
import { ThemedView } from "../components/ThemedView";
import { SuccessResponseDto } from "../dto/SuccessResponseDto";
import { TouchableOpacity } from "react-native-gesture-handler";
import useApplicationStore from "../stores/ApplicationStore";

export default function History({ navigation }: HistoryScreenProps) {
  const appStore = useApplicationStore();
  const [games, setGames] = useState<GameType[]>([]);

  async function getGames() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/games");
      const jsonResponse: SuccessResponseDto = await response.json();

      const transformedGames: GameType[] = [];
      jsonResponse.data.map((game: GameDto) => {
        const transformedGame: GameType = {
          id: game.id,
          teamHome: game.teamCompetingHome.team.name,
          teamVisitor: game.teamCompetingVisitor.team.name,
          scoreHome: game.scoreHome,
          scoreVisitor: game.scoreVisitor,
        };
        transformedGames.push(transformedGame);
      });
      setGames(transformedGames);
    } catch (e) {
      console.log(e);
      setGames([]);
    }
  }

  useEffect(() => {
    const focusHistory = navigation.addListener("focus", () => {
      getGames();
    });

    return focusHistory;
  }, [navigation]);

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
      <ThemedText>Matchs</ThemedText>
      <TouchableOpacity
        onPress={async () => {
          const response = await fetch("http://127.0.0.1:8000/api/games/16");
      const jsonResponse: SuccessResponseDto = await response.json();
      appStore.setGame(jsonResponse.data);
          navigation.navigate("GameOverview");
        }}
      >
        <Text>Test</Text>
      </TouchableOpacity>
      <ThemedView>
        {games.map((game) => (
          <ThemedText key={game.id}>
            {game.id} / {game.teamHome} {game.scoreHome} - {game.scoreVisitor}{" "}
            {game.teamVisitor}
          </ThemedText>
        ))}
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
  formContainer: {
    gap: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  form: {
    gap: 16,
  },
});
