import { createRoot } from "react-dom/client";
import App from "./components/App.tsx";
import "./styles/index.css";
import { AuthProvider } from "./providers/authProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
