import { Box, Button, Typography } from "@mui/material";
import { StyleSheet } from "../shared/style-sheet";
import { useCallback } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { colors } from "../shared/constants";

const SignIn = () => {
  const signInWithGoogle = useCallback(() => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Signed in as:", user.displayName);
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
      });
  }, []);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.loginForm}>
        <Typography sx={styles.header}>Chatty</Typography>
        <Typography sx={styles.subheader}>
          Hello, Please Register/Sign in with your Google Account
        </Typography>
        <Button sx={styles.loginBtn} onClick={signInWithGoogle}>
          Continue with Google
        </Button>
      </Box>
    </Box>
  );
};
export default SignIn;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginForm: {
    height: "300px",
    width: "400px",
    background: colors.blurple,
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    gap: "40px",
    color: colors.white,
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: "28px",
  },
  subheader: {
    fontWeight: "500",
    fontSize: "14px",
    width: "70%",
    textAlign: "left",
  },
  loginBtn: {
    background: colors.white,
    textTransform: "none",
    color: colors.blurple,
    fontWeight: "bold",
    fontSize: "16px",
    letterSpacing: 0.8,
  },
});
