import { createRoot } from "react-dom/client";
import App from "./components/App.tsx";
import "./styles/index.css";
import { AuthProvider } from "./providers/authProvider.tsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
