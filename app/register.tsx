import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import InputField from "./components/InputField";

export default function Register() {
  const { control, handleSubmit } = useForm({
    defaultValues: { username: "", email: "", password: "", confirmPassword: "" }
  });

  const onSubmit = (data: any) => {
    // Acum data va include: username, email, password și confirmPassword
    console.log("REGISTER READY →", data);
  };

  return (
    <View className="flex-1 bg-[#1b1a17] px-6 justify-center">

      <Text className="text-4xl font-bold mb-10 text-center text-[#d1a075]">
        Creează cont
      </Text>

      {/* NOU: Câmp Nume Utilizator */}
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

      {/* NOU: Câmp Confirmare Parolă */}
      <InputField
        control={control}
        name="confirmPassword"
        label="Confirmă Parola"
        placeholder="••••••••"
        secureTextEntry
      />
      
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        // Am păstrat margin-top pentru a separa formularul de buton
        className="bg-[#d1a075] py-4 rounded-xl active:scale-95 shadow-xl mt-4" 
      >
        <Text className="text-center text-[#1b1a17] font-semibold text-lg">
          Creează cont
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