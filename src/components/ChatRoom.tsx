import { Box, TextField, IconButton, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { colors } from "../shared/constants";
import { useChat } from "../providers/chatProvider";
import ChatMessage from "./ChatMessage";
import { useState, useRef, useEffect } from "react";
import { StyleSheet } from "../shared/style-sheet";

const ChatRoom = () => {
  const { messages, loading, sendMessage, selectedChatRoom } = useChat();
  const [formValue, setFormValue] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages?.length)
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(formValue);
    setFormValue("");
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>{selectedChatRoom}</Box>

      <Box sx={styles.messages}>
        {loading ? (
          <CircularProgress sx={{ alignSelf: "center", mt: 4 }} />
        ) : (
          messages?.map((m) => <ChatMessage key={m.id} message={m} />)
        )}
        <div ref={bottomRef} />
      </Box>

      <Box component="form" onSubmit={handleSend} sx={styles.inputBar}>
        <TextField
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type a message…"
          size="small"
          fullWidth
          sx={styles.textField}
        />
        <IconButton type="submit" sx={styles.sendBtn}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    background: colors.white,
    overflow: "hidden",
  },
  header: {
    color: colors.black,
    fontWeight: 600,
    fontSize: "18px",
    px: 3,
    py: 2,
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    padding: "0 40px",
  },
  inputBar: {
    p: 2,
    background: colors.grey,
    display: "flex",
    gap: 8,
  },

  textField: {
    "& .MuiInputBase-root": {
      background: colors.white,
      borderRadius: 8,
    },
  },

  sendBtn: {
    background: colors.blurple,
    color: colors.white,
    "&:hover": { opacity: 0.85, background: colors.blurple },
  },
});
