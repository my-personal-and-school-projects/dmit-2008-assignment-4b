import { Box } from "@mui/material";
import NavBar from "@/components/NavBar";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import ApplicationsList from "@/components/applications/ApplicationsList";
import { getApplications } from "@/utils/api/jobs";
import { Typography } from "@mui/material";

export default function Applications() {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  //Fetch the application on load
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  if (loading) {
    return (
      <main>
        <NavBar />
        <Container>
          <Typography variant="h4" sx={{ paddingTop: 2, paddingBottom: 2 }}>
            Applications
          </Typography>
          <Box
            sx={{ display: "flex", paddingTop: 4, justifyContent: "center" }}
          >
            <CircularProgress />
          </Box>
        </Container>
      </main>
    );
  }
  return (
    <main>
      <NavBar />
      <Container>
        <Typography variant="h4" sx={{ paddingTop: 2, paddingBottom: 2 }}>
          Applications
        </Typography>
        <ApplicationsList applications={applications} />
      </Container>
    </main>
  );
}
