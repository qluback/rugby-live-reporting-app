import { HomeScreenProps, StackParamList } from "../types/NavigationType";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewGame from "./NewGame";
import History from "./History";

export default function HomeTabs({ navigation }: HomeScreenProps) {
  const Tab = createBottomTabNavigator<StackParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#002A61",
      }}
    >
      <Tab.Screen name="NewGame" children={(props) => <NewGame {...props} />} options={{ headerShown: false, title: "Nouveau match" }} />
      <Tab.Screen name="History" children={(props) => <History {...props} />} options={{ headerShown: false, title: "Historique" }} />
    </Tab.Navigator>
  );
}
