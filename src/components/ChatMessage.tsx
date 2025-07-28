import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../providers/authProvider";
import { colors } from "../shared/constants";
import { StyleSheet } from "../shared/style-sheet";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type Message = {
  id?: string;
  text: string;
  uid: string;
  displayName: string;
  photoURL?: string;
  createdAt: any;
};

const ChatMessage = ({ message }: { message: Message }) => {
  const { user } = useAuth();
  const isMine = user?.uid === message.uid;

  return (
    <Box
      sx={{
        ...styles.row,
        flexDirection: isMine ? "row-reverse" : "row",
      }}
    >
      <Avatar
        src={message.photoURL}
        alt={message.displayName}
        sx={styles.avatar}
      />

      <Box sx={isMine ? styles.bubbleMine : styles.bubbleOther}>
        <Typography sx={styles.meta}>
          {message.displayName} •{" "}
          {message.createdAt?.seconds
            ? dayjs.unix(message.createdAt.seconds).fromNow()
            : "sending…"}
        </Typography>

        <Typography sx={styles.text}>{message.text}</Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  row: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
  },
  bubbleMine: {
    maxWidth: "70%",
    background: colors.blurple,
    color: colors.white,
    px: 1.5,
    py: 1,
    borderRadius: 8,
  },
  bubbleOther: {
    maxWidth: "70%",
    background: colors.grey,
    color: colors.white,
    px: 1.5,
    py: 1,
    borderRadius: 8,
  },
  meta: {
    fontSize: 12,
    fontWeight: 600,
    mb: 0.5,
  },
  text: {
    fontSize: 14,
  },
});
