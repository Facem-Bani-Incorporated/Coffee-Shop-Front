import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const API_URL = "http://localhost:8080/api/auth";

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

  async removeStorageItem(key: string) {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
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

      const contentType = response.headers.get("content-type");
      let result;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        result = await response.json();
      } else {
        result = { message: await response.text() };
      }

      if (response.ok) {
        const token = result.token || result.accessToken;
        if (token) {
          await this.setStorageItem('userToken', token);
          // Salvăm obiectul utilizatorului pentru a-l afișa în profil
          await this.setStorageItem('userData', JSON.stringify(result));
          return result;
        }
      }
      throw new Error(result.message || "Credentiale incorecte");
    } catch (error: any) {
      throw error.message || "Eroare de conexiune la server";
    }
  },

  async logout() {
    await this.removeStorageItem('userToken');
    await this.removeStorageItem('userData');
  },

  async register(data: any) {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        role: ["USER"]
      }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Eroare la inregistrare");
    return result;
  }
};