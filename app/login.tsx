import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import InputField from "./components/InputField";

export default function Login() {
  const { control, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = (data: any) => {
    console.log("LOGIN READY →", data);
  };

  return (
    <View className="flex-1 bg-[#1b1a17] px-6 justify-center">

      <Text className="text-4xl font-bold mb-10 text-center text-[#d1a075]">
        Autentificare
      </Text>

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

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="bg-[#d1a075] py-4 rounded-xl active:scale-95 shadow-xl"
      >
        <Text className="text-center text-[#1b1a17] font-semibold text-lg">
          Intră în cont
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
