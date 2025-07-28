import { Box } from "@mui/material";
import { StyleSheet } from "../shared/style-sheet";

type Props = {};

const Sidebar = (props: Props) => {
  return <Box sx={styles.container}>Sidebar</Box>;
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    background: "green",
  },
});
