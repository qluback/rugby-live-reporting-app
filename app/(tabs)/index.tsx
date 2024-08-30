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
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="GameOverview" component={GameOverview} />
      </Stack.Navigator>
  );

}
