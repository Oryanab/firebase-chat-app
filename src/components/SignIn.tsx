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
        console.log("Signed in as:", result.user.displayName);
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
      });
  }, []);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.loginForm}>
        <Typography variant="h4" sx={styles.header}>
          👋 Welcome to Chatty
        </Typography>
        <Typography sx={styles.subheader}>
          Sign in with your Google account to continue chatting
        </Typography>
        <Button onClick={signInWithGoogle} sx={styles.loginBtn}>
          Continue with Google
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkGrey,
  },
  loginForm: {
    width: 360,
    padding: "32px 24px",
    background: `linear-gradient(145deg, ${colors.grey}, ${colors.darkGrey})`,
    borderRadius: "16px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    textAlign: "center",
    color: colors.white,
  },
  header: {
    fontWeight: 700,
    fontSize: "24px",
    color: colors.white,
  },
  subheader: {
    fontSize: "14px",
    fontWeight: 400,
    color: colors.lightGrey,
  },
  loginBtn: {
    mt: 2,
    backgroundColor: colors.white,
    color: colors.blurple,
    fontWeight: "bold",
    textTransform: "none",
    padding: "10px 20px",
    fontSize: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "all 0.2s ease",
    "&:hover": {
      opacity: 0.9,
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      backgroundColor: colors.white,
    },
  },
});
