import HomeScreen from "@/src/screens/HomeScreen";
import ProfileScreen from "@/src/screens/ProfileScreen";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HomeScreen />
      <ProfileScreen/>
    </View>
  );
}
