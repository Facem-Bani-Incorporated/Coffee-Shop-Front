import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const API_URL = "http://localhost:8080/api/auth"; // Pe browser folosim localhost

export const authService = {
  async setStorageItem(key: string, value: string) {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },

  async getStorageItem(key: string) {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },

  async login(data: any) {
    try {
      const response = await fetch(`${API_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.email, 
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok && (result.token || result.accessToken)) {
        const token = result.token || result.accessToken;
        await this.setStorageItem('userToken', token);
        return result;
      } else {
        throw new Error(result.message || "Credentiale incorecte");
      }
    } catch (error: any) {
      throw error.message || "Eroare de conexiune la server";
    }
  },

  async register(data: any) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
      role: ["USER"] // Modificat în majuscule
    }),
  });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Eroare la inregistrare");
    return result;
  }
};