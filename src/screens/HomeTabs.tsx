import { HomeScreenProps, StackParamList } from "../types/NavigationType";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewGame from "./NewGame";
import History from "./History";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeTabs({ navigation }: HomeScreenProps) {
  const Tab = createBottomTabNavigator<StackParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#002A61",
      }}
    >
      <Tab.Screen
        name="NewGame"
        children={(props) => <NewGame {...props} />}
        options={{ headerShown: false, title: "Nouveau match", tabBarIcon: ({ focused, color, size }) => {
          // You can return any component that you like here!
          return <MaterialCommunityIcons name="rugby" size={size} color={color} />;
        }, }}
      />
      <Tab.Screen
        name="History"
        children={(props) => <History {...props} />}
        options={{ headerShown: false, title: "Historique", tabBarIcon: ({ focused, color, size }) => {
          // You can return any component that you like here!
          return <MaterialCommunityIcons name="history" size={size} color={color} />;
        }, }}
      />
    </Tab.Navigator>
  );
}
