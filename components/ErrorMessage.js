const { Box, Typography } = require("@mui/material");
import Alert from "@mui/material/Alert";

export default function ErrorMessage({ show, errorMessage }) {
  return (
    <Box
      sx={{
        display: show ? "block" : "none",
        marginBottom: "1rem",
      }}
      width={"93%"}
    >
      <Alert severity="error">
        <Typography>{errorMessage}</Typography>
      </Alert>
    </Box>
  );
}
