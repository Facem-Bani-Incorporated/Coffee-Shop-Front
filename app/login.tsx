import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { authService } from "../services/authService";
import InputField from "./components/InputField";

export default function Login() {
  const router = useRouter();
  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await authService.login(data);
      console.log("Logat cu succes:", response.username);
      // Navigăm către ecranul principal
      router.replace("/welcome"); 
    } catch (error: any) {
      Alert.alert("Eroare Login", error.toString());
    }
  };

  return (
    <View className="flex-1 bg-[#1b1a17] px-6 justify-center">
      <Text className="text-4xl font-bold mb-10 text-center text-[#d1a075]">
        Autentificare
      </Text>

      <InputField
        control={control}
        name="email"
        label="Email sau Username"
        placeholder="exemplu@firma.com"
      />

      <InputField
        control={control}
        name="password"
        label="Parola"
        placeholder="••••••••"
        secureTextEntry
      />

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className={`py-4 rounded-xl active:scale-95 shadow-xl ${isSubmitting ? 'bg-gray-500' : 'bg-[#d1a075]'}`}
      >
        <Text className="text-center text-[#1b1a17] font-semibold text-lg">
          {isSubmitting ? "Se încarcă..." : "Intră în cont"}
        </Text>
      </TouchableOpacity>

      <Text className="text-center mt-6 text-[#e7dfd4]">
        Nu ai cont?{" "}
        <Link href="/register" className="text-[#d1a075] font-semibold">
          Înregistrează-te
        </Link>
      </Text>
    </View>
  );
}