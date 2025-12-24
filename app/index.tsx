import { Redirect } from "expo-router";

export default function Index() {
  // Redirecționăm utilizatorul direct către pagina de login
  return <Redirect href="/login" />;
}