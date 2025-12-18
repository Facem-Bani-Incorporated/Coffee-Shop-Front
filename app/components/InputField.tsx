import { Controller } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

interface InputFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
}

export default function InputField({
  control,
  name,
  label,
  placeholder,
  secureTextEntry,
}: InputFieldProps) {
  return (
    <View className="mb-4">
      <Text className="text-[#d1a075] mb-1 text-base font-medium">{label}</Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-[#1b1a17] border border-[#3c2f26] rounded-xl px-4 py-3 text-white focus:border-[#d1a075]"
            placeholder={placeholder}
            placeholderTextColor="#7d7368"
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
    </View>
  );
}
