import { StyleSheet } from "../shared/style-sheet";
import { Box } from "@mui/material";
import { useAuth } from "../providers/authProvider";
import SignIn from "./SignIn";

import { colors } from "../shared/constants";
import ChatHub from "./ChatHub";

const App = () => {
  const { user } = useAuth();
  return <Box sx={styles.container}>{user ? <ChatHub /> : <SignIn />}</Box>;
};

export default App;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    background: colors.background,
  },
});
