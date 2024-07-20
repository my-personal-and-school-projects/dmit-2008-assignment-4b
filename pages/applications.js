import { Box } from "@mui/material";
import NavBar from "@/components/NavBar";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

export default function Applications() {
  const [loading, setLoading] = useState(true);

  /*   if (loading) {
    return (
      <main>
        <NavBar />
        <Container>
          <Box
            sx={{ display: "flex", paddingTop: 4, justifyContent: "center" }}
          >
            <CircularProgress />
          </Box>
        </Container>
      </main>
    );
  } */

  return (
    <main>
      <NavBar />
      <Container>
        <Box>Applications Page</Box>
      </Container>
    </main>
  );
}
