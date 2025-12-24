import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { authService } from '../../services/authService'; // Ajustează calea dacă e nevoie

const { width } = Dimensions.get('window');

type ValidRoute = '/inventar' | '/produse' | '/angajati' | '/comenzi';

export default function HomeScreen() {
  const router = useRouter();
  const [buttonsVisible, setButtonsVisible] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("Utilizator");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const RADIUS = width * 0.33; 

  const buttonAnims = useRef([
    new Animated.Value(0), new Animated.Value(0), 
    new Animated.Value(0), new Animated.Value(0)
  ]).current;

  // Încărcăm numele utilizatorului la montarea componentei
  useEffect(() => {
    const loadUser = async () => {
      const data = await authService.getStorageItem('userData');
      if (data) {
        const user = JSON.parse(data);
        setUserName(user.username || "Utilizator");
      }
    };
    loadUser();
  }, []);

  const toggleButtons = (show: boolean): void => {
    if (show) {
      setShowProfileMenu(false); // Închidem profilul dacă deschidem meniul
      setButtonsVisible(true);
      Animated.stagger(80, 
        buttonAnims.map(anim => 
          Animated.spring(anim, { toValue: 1, friction: 8, tension: 40, useNativeDriver: true })
        )
      ).start();
    } else {
      Animated.parallel(
        buttonAnims.map(anim => 
          Animated.timing(anim, { toValue: 0, duration: 250, useNativeDriver: true })
        )
      ).start(() => setButtonsVisible(false));
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    router.replace("/"); // Navighează înapoi la Login
  };

  const menuItems = [
    { emoji: '📦', title: 'Inventar', route: '/inventar', x: 0, y: -1 },
    { emoji: '☕', title: 'Produse', route: '/produse', x: 1, y: 0 },
    { emoji: '👥', title: 'Angajați', route: '/angajati', x: 0, y: 1 },
    { emoji: '🛍️', title: 'Comenzi', route: '/comenzi', x: -1, y: 0 },
  ];

  return (
    <LinearGradient colors={['#3d2622', '#1a0f0d']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {buttonsVisible ? (
          <TouchableOpacity onPress={() => toggleButtons(false)} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#D7CCC8" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            onPress={() => setShowProfileMenu(!showProfileMenu)} 
            style={styles.profileButton}
          >
            <Ionicons name="person-circle-outline" size={32} color="#D7CCC8" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>COFFEE SHOP</Text>
      </View>

      {/* Meniu Profil/Logout */}
      {showProfileMenu && !buttonsVisible && (
        <View style={styles.profileDropdown}>
          <Text style={styles.userText}>Salut, {userName}!</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#ff6b6b" />
            <Text style={styles.logoutText}>Deconectare</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.content}>
        {!buttonsVisible && (
          <TouchableOpacity
            onPress={() => toggleButtons(true)}
            activeOpacity={0.8}
            style={styles.mainCircle}
          >
            <Text style={{ fontSize: 40 }}>☕</Text>
            <Text style={styles.mainText}>MENIU</Text>
          </TouchableOpacity>
        )}

        {buttonsVisible && menuItems.map((item, index) => (
          <Animated.View
            key={index}
            style={[
              styles.buttonWrapper,
              {
                opacity: buttonAnims[index],
                transform: [
                  { scale: buttonAnims[index] },
                  { translateX: buttonAnims[index].interpolate({ 
                      inputRange: [0, 1], outputRange: [0, item.x * RADIUS] 
                    }) 
                  },
                  { translateY: buttonAnims[index].interpolate({ 
                      inputRange: [0, 1], outputRange: [0, item.y * RADIUS] 
                    }) 
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => router.push(item.route as any)}
              style={styles.roundButton}
            >
              <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
              <Text style={styles.buttonLabel}>{item.title}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 60,
    zIndex: 10,
  },
  profileButton: {
    position: 'absolute',
    right: 20,
    top: 60,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#D7CCC8',
    letterSpacing: 4,
  },
  profileDropdown: {
    position: 'absolute',
    top: 105,
    right: 20,
    backgroundColor: '#2b1d1a',
    padding: 15,
    borderRadius: 12,
    zIndex: 100,
    borderWidth: 1,
    borderColor: '#4d3632',
    minWidth: 150,
  },
  userText: {
    color: '#D7CCC8',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center'
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#4d3632',
    paddingTop: 10,
  },
  logoutText: {
    color: '#ff6b6b',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 13,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#6d4c41',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  mainText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  buttonWrapper: { position: 'absolute' },
  roundButton: {
    width: 95,
    height: 95,
    borderRadius: 50,
    backgroundColor: '#8d6e63',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
});