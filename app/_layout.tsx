import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "../global.css";
import { authService } from "../services/authService";

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Verificăm dacă avem token în storage
      const token = await authService.getStorageItem('userToken');
      const hasToken = !!token;
      setIsAuthenticated(hasToken);

      // 2. Identificăm unde se află utilizatorul în aplicație
      // segments[0] este primul folder/fișier din calea URL-ului
      const inAuthGroup = segments[0] === 'login' || segments[0] === 'register' || segments[0] === 'welcome' || segments[0] === undefined;

      if (!hasToken && !inAuthGroup) {
        // Dacă NU e logat și încearcă să intre în aplicație -> Welcome
        router.replace('/welcome');
      } else if (hasToken && inAuthGroup) {
        // Dacă ESTE logat și stă pe paginile de login -> Home
        router.replace('/(tabs)/home');
      }
      
      setIsReady(true);
    };

    checkAuth();
  }, [segments]); // Se execută la fiecare schimbare de rută

  // Afișăm un indicator de încărcare până verificăm token-ul
  // Asta previne "flash-ul" paginii de login înainte de a fi trimis la home
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f0f' }}>
        <ActivityIndicator size="large" color="#c7a17a" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Definirea rutei pentru pagina animată (fostul index) */}
      <Stack.Screen name="welcome" />
      
      {/* Rutele de autentificare */}
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      
      {/* Ruta protejată */}
      <Stack.Screen name="(tabs)/home" />
    </Stack>
  );
}