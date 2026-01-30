import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Mada-Depann 🇲🇬",
          headerTitleStyle: { fontWeight: 'bold' } 
        }} 
      />
      
      <Stack.Screen 
        name="profile" 
        options={{ 
          title: "Mon Compte",
          presentation: 'modal'
        }} 
      />
    </Stack>
  );
}