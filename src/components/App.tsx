import { useCollectionData } from "react-firebase-hooks/firestore";
import { StyleSheet } from "../shared/style-sheet";
import { Box } from "@mui/material";
import { useAuth } from "../providers/authProvider";
import SignIn from "./SignIn";
import ChatRoom from "./ChatRoom";
import { colors } from "../shared/constants";

const App = () => {
  const { user } = useAuth();
  return <Box sx={styles.container}>{user ? <ChatRoom /> : <SignIn />}</Box>;
};

export default App;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    background: colors.background,
  },
});
