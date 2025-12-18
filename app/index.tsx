import { Href, Link } from "expo-router";
import { useEffect } from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";

// Am scos importul LinearGradient

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#0f0f0f] items-center justify-center relative overflow-hidden">
      
      {/* 1. ANIMATED BACKGROUND (The "Mesh" Effect) */}
      <BackgroundMesh />

      {/* 2. OVERLAY GRAIN (Optional visual texture) */}
      <View className="absolute w-full h-full bg-black/20" pointerEvents="none" />

      {/* 3. MAIN CONTENT */}
      <View className="w-full h-full px-6 justify-between py-12 z-10">
        
        {/* Top Spacer */}
        <View />

        {/* Center Card - Glass Effect */}
        <Animated.View 
          entering={FadeInDown.delay(300).springify()}
          className="items-center"
        >
          {/* Glowing Icon Container */}
          <View className="mb-8 relative">
            {/* Glow behind icon */}
            <View className="absolute top-0 left-0 w-24 h-24 bg-[#c7a17a] blur-2xl opacity-40 rounded-full" />
            
            <View className="w-24 h-24 rounded-[32px] bg-[#1a1a1a]/80 border border-white/10 items-center justify-center backdrop-blur-xl shadow-2xl shadow-black">
              <Image
                // NOUL URL PENTRU IMAGINEA DE PE PINTEREST
                source={{ uri: "https://i.pinimg.com/736x/84/1a/88/841a8806252951caa6f0f88f8e281394.jpg" }}
                
                className="w-10 h-10 opacity-90"
                style={{ tintColor: "#e5cfa8" }}
              />
            </View>
          </View>

          <Text className="text-white text-5xl font-bold tracking-tighter text-center">
            Coffee
            <Text className="text-[#c7a17a]">Manager</Text>
          </Text>

          <Text className="text-white/50 text-center text-base mt-4 leading-6 max-w-[80%]">
            Excelență în fiecare ceașcă. Administrează fluxul cafenelei tale cu precizie.
          </Text>
        </Animated.View>

        {/* Bottom Actions */}
        <Animated.View 
          entering={FadeInDown.delay(600).springify()}
          className="w-full gap-4 mb-4"
        >
          <LiquidButton href="/login" label="Autentificare" variant="primary" />
          <LiquidButton href="/register" label="Creare cont" variant="secondary" />
          
          <Text className="text-white/20 text-xs text-center mt-4">
            © 2025 Coffee Management Inc.
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}

/* ---------------------------------------------------
   BACKGROUND MESH ANIMATION
--------------------------------------------------- */
function BackgroundMesh() {
  const t1 = useSharedValue(0);
  const t2 = useSharedValue(0);

  useEffect(() => {
    t1.value = withRepeat(withSequence(withTiming(1, { duration: 5000, easing: Easing.inOut(Easing.ease) }), withTiming(0, { duration: 5000, easing: Easing.inOut(Easing.ease) })), -1, true);
    t2.value = withRepeat(withSequence(withTiming(1, { duration: 8000, easing: Easing.inOut(Easing.ease) }), withTiming(0, { duration: 8000, easing: Easing.inOut(Easing.ease) })), -1, true);
  }, []);

  const blob1Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: t1.value * 50 },
      { translateY: t1.value * -50 },
      { scale: 1 + t1.value * 0.2 },
    ],
    opacity: 0.6,
  }));

  const blob2Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: t2.value * -30 },
      { translateY: t2.value * 40 },
      { scale: 1 + t2.value * 0.1 }, 
    ],
    opacity: 0.5,
  }));

  return (
    <View className="absolute inset-0 bg-[#0f0f0f]">
      {/* Warm Gold Blob */}
      <Animated.View style={blob1Style} className="absolute -top-[10%] -left-[10%] w-[120%] h-[50%] bg-[#c7a17a] rounded-full blur-[120px]" />
      
      {/* Deep Brown Blob */}
      <Animated.View style={blob2Style} className="absolute top-[40%] -right-[20%] w-[100%] h-[60%] bg-[#4a3b2a] rounded-full blur-[100px]" />
      
      {/* NOTA: Am eliminat LinearGradient-ul de jos care făcea fade-ul spre negru.
         Dacă vrei o separare, putem folosi un View simplu, dar blobs arată ok și fără.
      */}
    </View>
  );
}

/* ---------------------------------------------------
   LIQUID BUTTON (Solid Colors Version)
--------------------------------------------------- */
function LiquidButton({
  href,
  label,
  variant,
}: {
  href: Href;
  label: string;
  variant: "primary" | "secondary";
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 10, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Link href={href} asChild>
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View style={animatedStyle} className="w-full">
          {variant === "primary" ? (
            // PRIMARY BUTTON (Solid Gold Color)
            // Am inlocuit LinearGradient cu un View simplu si bg-[#c7a17a]
            <View className="rounded-2xl overflow-hidden shadow-lg shadow-orange-900/20 bg-[#c7a17a]">
              <View className="py-5 items-center justify-center">
                {/* Inner Shine Line */}
                <View className="absolute top-0 w-full h-[1px] bg-white/40" />
                <Text className="text-[#1a1a1a] font-bold text-lg tracking-wide">{label}</Text>
              </View>
            </View>
          ) : (
            // SECONDARY BUTTON (Glassmorphism - ramas neschimbat, deja folosea culori solide cu transparenta)
            <View className="py-5 rounded-2xl items-center justify-center bg-white/5 border border-white/10 backdrop-blur-md">
               <Text className="text-[#e5cfa8] font-semibold text-lg tracking-wide">{label}</Text>
            </View>
          )}
        </Animated.View>
      </Pressable>
    </Link>
  );
}