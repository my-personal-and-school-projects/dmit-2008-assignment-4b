import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

import AvailableJobList from "@/components/AvailableJobList";
import NavBar from "@/components/NavBar";

import { getJobs, getSavedJobs } from "@/utils/api/jobs";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const data = await getSavedJobs();
      setSavedJobs(data);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  };

  if (loading) {
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
  }

  return (
    <main>
      <NavBar />
      <Container>
        <AvailableJobList
          jobs={jobs}
          savedJobs={savedJobs}
          setSavedJobs={setSavedJobs}
        />
      </Container>
    </main>
  );
}
