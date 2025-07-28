import { Avatar, Box, Button, Typography } from "@mui/material";
import { StyleSheet } from "../shared/style-sheet";
import { chatRoomNames, colors } from "../shared/constants";
import { useChat } from "../providers/chatProvider";
import { Upload } from "@mui/icons-material";
import { useAuth } from "../providers/authProvider";
import { useRef, useState } from "react";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const Sidebar = () => {
  const { handleChangeChatRoom, selectedChatRoom } = useChat();
  const { user, uploadAvatar } = useAuth();

  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectFile = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError("Max upload size is 1 MB");
      setTimeout(() => setError(""), 3000);
      return;
    }
    uploadAvatar(file);
  };

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
      <Box sx={styles.userSection}>
        <Avatar src={user?.photoURL ?? ""} sx={styles.avatar} />
        <Button
          variant="contained"
          startIcon={<Upload />}
          onClick={handleSelectFile}
          sx={styles.uploadBtn}
        >
          Change
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
        {error && <Typography sx={styles.errorText}>{error}</Typography>}
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
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mt: 4,
    position: "absolute",
    bottom: 10,
  },
  avatar: { width: 56, height: 56 },
  uploadBtn: {
    background: colors.white,
    color: colors.blurple,
    textTransform: "none",
    fontWeight: 600,
    "&:hover": { opacity: 0.85, background: colors.white },
  },
  errorText: {
    fontSize: 12,
    color: "#FF6B6B",
  },
});
