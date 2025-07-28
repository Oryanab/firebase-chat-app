import { Box } from "@mui/material";
import { StyleSheet } from "../shared/style-sheet";
import Topbar from "./Topbar";
import ChatRoom from "./ChatRoom";
import Sidebar from "./Sidebar";
import { ChatProvider } from "../providers/chatProvider";

const ChatHub = () => {
  return (
    <ChatProvider>
      <Box sx={styles.container}>
        <Box sx={styles.chatSidebar}>
          <Sidebar />
        </Box>
        <Box sx={styles.chat}>
          <Topbar />
          <ChatRoom />
        </Box>
      </Box>
    </ChatProvider>
  );
};

export default ChatHub;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
  },
  chat: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  chatSidebar: {
    width: "20%",
  },
});
