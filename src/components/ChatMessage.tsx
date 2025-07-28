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
    <Box sx={styles.row({ isMine })}>
      <Avatar
        src={message.photoURL}
        alt={message.displayName}
        sx={styles.avatar}
      />

      <Box sx={styles.column({ isMine })}>
        <Box sx={styles.bubble({ isMine })}>
          <Typography sx={styles.text}>{message.text}</Typography>
        </Box>

        <Typography sx={styles.meta({ isMine })}>
          {message.displayName} •{" "}
          {message.createdAt?.seconds
            ? dayjs.unix(message.createdAt.seconds).fromNow()
            : "sending…"}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  row: ({ isMine }: { isMine: boolean }) => ({
    display: "flex",
    flexDirection: isMine ? "row-reverse" : "row",
    alignItems: "flex-start",
    gap: 4,
  }),

  column: ({ isMine }: { isMine: boolean }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: isMine ? "flex-end" : "flex-start",
    maxWidth: "75%",
  }),

  avatar: {
    width: 32,
    height: 32,
  },

  bubble: ({ isMine }: { isMine: boolean }) => ({
    background: isMine ? colors.blurple : colors.grey,
    color: colors.white,
    px: 1.5,
    py: 1,
    borderRadius: 5,
  }),

  text: {
    fontSize: 14,
    wordBreak: "break-word",
  },

  meta: ({ isMine }: { isMine: boolean }) => ({
    marginTop: 2,
    fontSize: 11,
    color: "#ADB3BA",
    textAlign: isMine ? "right" : "left",
  }),
});
