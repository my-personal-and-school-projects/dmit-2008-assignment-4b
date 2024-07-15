import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SavedJobsList from "@/components/savedJobs/SavedJobsList";
import CircularProgress from "@mui/material/CircularProgress";
import { getSavedJobsDetails } from "@/utils/api/jobs";

export default function savedJobsList() {
  const router = useRouter();
  const { savedJobsList } = router.query;
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);

  //fetch saved-jobs
  useEffect(() => {
    setLoading(true);
    getSavedJobsDetails()
      .then((data) => {
        setSavedJobs(data);
      })
      .catch((error) => {
        console.error("Error fetching saved-jobs:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //Displa spinner if loading
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
        <SavedJobsList savedJobs={savedJobs} />
      </Container>
    </main>
  );
}
