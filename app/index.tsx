import AddHighlight from "@/screens/AddHighlight";
import GameOverview from "@/screens/GameOverview";
import Home from "@/screens/Home";
import { StackParamList } from "@/types/NavigationType";
import { createStackNavigator } from "@react-navigation/stack";
import "../assets/js/gesture-handler";

export default function App() {
  const Stack = createStackNavigator<StackParamList>();

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
        options={{
          title: "Rapport de match",
          headerBackTitle: "Retour",
          headerTintColor: "#002A61",
        }}
      />
      <Stack.Screen
        name="AddHighlight"
        component={AddHighlight}
        options={{
          title: "Ajouter un temps-fort",
          headerBackTitle: "Retour",
          headerTintColor: "#002A61",
        }}
      />
    </Stack.Navigator>
  );
}
