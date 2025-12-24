import { Redirect } from "expo-router";
import 'react-native-reanimated';
export default function Index() {
  // Redirecționăm utilizatorul direct către pagina de login
  return <Redirect href="/login" />;
}