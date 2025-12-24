import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import 'react-native-reanimated';
import "../global.css";
import { authService } from "../services/authService";
export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Verificăm token-ul
        const token = await authService.getStorageItem('userToken');
        const hasToken = !!token;
        setIsAuthenticated(hasToken);

        // 2. Determinăm unde se află utilizatorul
        // segments[0] este primul element din rută (ex: 'login', '(tabs)', etc.)
        const currentGroup = segments[0];

        // Definim rutele "publice" (unde poți sta ne-logat)
        // Adăugăm undefined pentru cazul în care ești chiar pe index (rădăcină)
        const inAuthGroup = 
          currentGroup === 'login' || 
          currentGroup === 'register' || 
          currentGroup === 'welcome' ||
          currentGroup === undefined; 

        if (hasToken && inAuthGroup) {
          // A. Ești LOGAT, dar încerci să vezi Login/Register -> Mergi la Home
          // Folosim replace pentru a nu putea da "Back" la login
          router.replace('/(tabs)/home');
        
        } else if (!hasToken && !inAuthGroup) {
          // B. NU ești logat, dar încerci să accesezi pagini protejate (Home) -> Mergi la Login
          router.replace('/login');
        }
        
      } catch (error) {
        console.error("Eroare la verificarea auth:", error);
      } finally {
        // Marchem că verificarea s-a terminat
        setIsReady(true);
      }
    };

    checkAuth();
  }, [segments]); // Se re-execută la fiecare schimbare de navigare

  // 3. Loading Screen - crucial pentru a evita flash-ul ecranelor greșite
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f0f' }}>
        <ActivityIndicator size="large" color="#c7a17a" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Indexul (invizibil, face doar redirect) */}
      <Stack.Screen name="index" /> 

      {/* Rutele Publice */}
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="welcome" />
      
      {/* Rutele Protejate (Grupul tabs) */}
      <Stack.Screen name="(tabs)/home" />
    </Stack>
  );
}