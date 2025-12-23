import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { authService } from "../services/authService";
import InputField from "./components/InputField";

export default function Register() {
  const router = useRouter();
  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: { username: "", email: "", password: "", confirmPassword: "" }
  });

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      Alert.alert("Eroare", "Parolele nu coincid!");
      return;
    }

    try {
      await authService.register(data);
      Alert.alert("Succes", "Cont creat! Te poți loga.", [
        { text: "OK", onPress: () => router.push("/login") }
      ]);
    } catch (error: any) {
      Alert.alert("Eroare Register", error.toString());
    }
  };

  return (
    <View className="flex-1 bg-[#1b1a17] px-6 justify-center">
      <Text className="text-4xl font-bold mb-10 text-center text-[#d1a075]">
        Creează cont
      </Text>

      <InputField
        control={control}
        name="username"
        label="Nume Utilizator"
        placeholder="stefan_coffee"
      />

      <InputField
        control={control}
        name="email"
        label="Email"
        placeholder="exemplu@firma.com"
      />

      <InputField
        control={control}
        name="password"
        label="Parola"
        placeholder="••••••••"
        secureTextEntry
      />

      <InputField
        control={control}
        name="confirmPassword"
        label="Confirmă Parola"
        placeholder="••••••••"
        secureTextEntry
      />
      
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className={`py-4 rounded-xl active:scale-95 shadow-xl mt-4 ${isSubmitting ? 'bg-gray-500' : 'bg-[#d1a075]'}`}
      >
        <Text className="text-center text-[#1b1a17] font-semibold text-lg">
          {isSubmitting ? "Se creează..." : "Creează cont"}
        </Text>
      </TouchableOpacity>

      <Text className="text-center mt-6 text-[#e7dfd4]">
        Ai deja cont?{" "}
        <Link href="/login" className="text-[#d1a075] font-semibold">
          Autentifică-te
        </Link>
      </Text>
    </View>
  );
}