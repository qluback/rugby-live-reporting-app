import { Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import ParallaxScrollView from "../components/ParallaxScrollView";
import { ThemedText } from "../components/ThemedText";
import { Colors } from "../constants/Colors";
import { HistoryScreenProps } from "../types/NavigationType";
import { useEffect, useState } from "react";
import { GameType } from "../types/GameType";
import { GameDto } from "../dto/GameDto";
import { ThemedView } from "../components/ThemedView";

export default function History({ navigation }: HistoryScreenProps) {
  const [games, setGames] = useState<GameType[]>([]);

  async function getGames() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/games");
      const data: GameDto[] = await response.json();

      const transformedGames: GameType[] = [];
      data.map((game) => {
        const transformedGame: GameType = {
          teamHome: game.teamHome.team.name,
          teamVisitor: game.teamVisitor.team.name,
          scoreHome: game.scoreHome,
          scoreVisitor: game.scoreVisitor
        };
        transformedGames.push(transformedGame);
      });

      setGames(transformedGames);
    } catch (e) {
      setGames([]);
    }
  }

  useEffect(() => {
    getGames();
  }, []);

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
      <ThemedView>
        {games.map(game => (
          <ThemedText>{game.teamHome} {game.scoreHome} - {game.scoreVisitor} {game.teamVisitor}</ThemedText>
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
