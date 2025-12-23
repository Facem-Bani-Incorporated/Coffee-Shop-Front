import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    // Ștergem token-ul la logout
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userToken');
    }
    router.replace('/login');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-3xl font-bold text-coffee-800 mb-2">
        ☕ Bun venit la Coffee Shop!
      </Text>
      <Text className="text-gray-600 mb-8">
        Ești logat cu succes. Ce dorești să comanzi?
      </Text>

      <TouchableOpacity 
        onPress={handleLogout}
        className="bg-red-500 px-8 py-3 rounded-full"
      >
        <Text className="text-white font-bold">Ieșire din cont</Text>
      </TouchableOpacity>
    </View>
  );
}