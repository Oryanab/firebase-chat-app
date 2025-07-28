import { Box } from "@mui/material";
import { StyleSheet } from "../shared/style-sheet";

type Props = {};

const ChatWindow = (props: Props) => {
  return <Box sx={styles.container}>ChatWindow</Box>;
};

export default ChatWindow;

const styles = StyleSheet.create({
  container: {
    background: "red",
  },
});
