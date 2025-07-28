import { Box } from "@mui/material";
import { StyleSheet } from "../shared/style-sheet";
import { useAuth } from "../providers/authProvider";
import { Logout } from "@mui/icons-material";
import { colors } from "../shared/constants";

const Topbar = () => {
  const { user, logout } = useAuth();
  return (
    <Box sx={styles.container}>
      <Box>Hello, {user?.displayName}</Box>
      <Box>
        <Logout sx={styles.logout} onClick={logout} />
      </Box>
    </Box>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  container: {
    background: colors.blurple,
    height: "60px",
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 20px",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    alignItems: "center",
  },
  logout: {
    cursor: "pointer",
    ":hover": {
      opacity: 0.7,
    },
  },
});
