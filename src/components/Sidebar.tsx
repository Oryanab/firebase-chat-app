import { Box, Typography } from "@mui/material";
import { StyleSheet } from "../shared/style-sheet";
import { chatRoomNames, colors } from "../shared/constants";
import { useChat } from "../providers/chatProvider";

const Sidebar = () => {
  const { handleChangeChatRoom, selectedChatRoom } = useChat();
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.header}>Select Chat Room</Typography>
      <Box sx={styles.chipWrapper}>
        {chatRoomNames.map((room) => (
          <Box
            onClick={() => handleChangeChatRoom(room)}
            key={room}
            sx={styles.chip({ isSelected: room === selectedChatRoom })}
          >
            {room}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    color: colors.white,
    padding: "20px",
  },
  header: {
    fontWeight: "600",
    fontSize: "20px",
  },
  chipWrapper: {
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    height: "100%",
  },
  chip: ({ isSelected }: { isSelected: boolean }) => ({
    background: isSelected ? colors.blurple : colors.white,
    color: isSelected ? colors.white : colors.black,
    padding: "6px 12px",
    borderRadius: "16px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "opacity 0.2s ease",
    "&:hover": {
      opacity: 0.7,
    },
  }),
});
