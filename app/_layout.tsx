import { useState } from 'react';
import { Stack } from "expo-router";
import SplashAnimated from "../src/components/SplashAnimated";

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);

  if (!isAppReady) {
    return (
      <SplashAnimated 
        onFinish={() => setIsAppReady(true)}
      />
    );
  }
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Mada-Depann 🇲🇬",
          headerTitleStyle: { fontWeight: 'bold' },
          headerShown: false 
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