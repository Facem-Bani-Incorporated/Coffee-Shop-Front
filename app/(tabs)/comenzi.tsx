import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Page() {
  const router = useRouter();

  return (
    <LinearGradient 
      colors={['#3d2622', '#1a0f0d']} 
      style={styles.container}
    >
      {/* Buton de Back dedicat pentru fiecare pagină */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="#D7CCC8" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DETALII</Text>
      </View>

      <View style={styles.content}>
        {/* Schimbă Emoji-ul și Textul de mai jos pentru fiecare fișier în parte */}
        <View style={styles.card}>
          <Text style={styles.emoji}>🛍️</Text> 
          <Text style={styles.title}>Gestionare Comenzi</Text>
          <Text style={styles.subtitle}>
            Aici vei putea gestiona stocurile de cafea și ingrediente.
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 10,
    borderRadius: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#D7CCC8',
    marginLeft: 15,
    letterSpacing: 2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 30,
    padding: 40,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  emoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#D7CCC8',
    textAlign: 'center',
    lineHeight: 22,
  },
});