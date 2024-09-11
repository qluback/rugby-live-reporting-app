import ScoringHighlightForm from "../components/form/ScoringHighlightForm";
import PlayerHighlightForm from "../components/form/PlayerHighlightForm";
import { HomeScreenProps, StackParamList } from "../types/NavigationType";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewGame from "./NewGame";
import History from "./History";

export default function HomeTabs({ navigation }: HomeScreenProps) {
  const Tab = createBottomTabNavigator<StackParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarIndicatorStyle: { backgroundColor: "#002A61" },
        tabBarActiveTintColor: "#002A61",
      }}
    >
      <Tab.Screen name="NewGame" children={(props) => <NewGame {...props} />} options={{ headerShown: false, title: "Nouveau match" }} />
      <Tab.Screen name="History" children={(props) => <History {...props} />} options={{ headerShown: false, title: "Historique" }} />
    </Tab.Navigator>
  );
}
