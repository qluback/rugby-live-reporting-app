import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ScoringHighlightForm from "@/components/form/ScoringHighlightForm";
import PlayerHighlightForm from "@/components/form/PlayerHighlightForm";
import { AddHighlightScreenProps } from "@/types/NavigationType";

export default function AddHighlight({ navigation }: AddHighlightScreenProps) {
  const Tab = createMaterialTopTabNavigator();

  function handleSubmitForm() {
    navigation.navigate("GameOverview");
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "#002A61" },
        tabBarActiveTintColor: "#002A61",
      }}
    >
      <Tab.Screen
        name="Points"
        children={(props) => (
          <ScoringHighlightForm onSubmitForm={handleSubmitForm} {...props} />
        )}
      />
      <Tab.Screen
        name="Joueurs"
        children={(props) => (
          <PlayerHighlightForm onSubmitForm={handleSubmitForm} {...props} />
        )}
      />
    </Tab.Navigator>
  );
}
