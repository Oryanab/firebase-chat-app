import { Box } from "@mui/material";
import { StyleSheet } from "../shared/style-sheet";

type Props = {};

const Topbar = (props: Props) => {
  return <Box sx={styles.container}>Topbar</Box>;
};

export default Topbar;

const styles = StyleSheet.create({
  container: {
    background: "yellow",
  },
});
