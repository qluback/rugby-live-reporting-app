import AddHighlight from "@/screens/AddHighlight";
import GameOverview from "@/screens/GameOverview";
import Home from "@/screens/Home";
import { RootStackParamList } from "@/types/NavigationType";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

export default function App() {
  const [screen, setScreen] = useState("game-overview");

  function handleSubmitTeams() {}

  // switch (screen) {
  //   case "game-overview":
  //     return <GameOverview />;
  //   case "home":
  //   default:
  //     return <Home />;
  // }

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Jour de match", headerTintColor: "#002A61" }}
      />
      <Stack.Screen
        name="GameOverview"
        component={GameOverview}
        options={{ title: "Rapport de match", headerBackTitle: "Retour", headerTintColor: "#002A61" }}
      />
      <Stack.Screen
        name="AddHighlight"
        component={AddHighlight}
        options={{ title: "Ajouter un temps-fort", headerBackTitle: "Retour", headerTintColor: "#002A61" }}
      />
    </Stack.Navigator>
  );
}
