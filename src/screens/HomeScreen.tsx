import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
type Props = any;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🗺️ Carte Mada-Depann</Text>
      <Text style={{ marginBottom: 20 }}>Ici on affichera la Google Map</Text>

      <Button
        title="Aller au Profil"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: { fontSize: 20, fontWeight: "bold", marginBottom: 10, color: "#333" },
});
