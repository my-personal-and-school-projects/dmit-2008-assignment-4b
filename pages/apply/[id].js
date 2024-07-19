import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { getJob } from "@/utils/api/jobs";
import ApplyJobDetails from "@/components/apply/ApplyJobDetails";
import ApplyJobForm from "@/components/apply/ApplyJobForm";

export default function savedJobsById() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch job on load
  useEffect(() => {
    //Step 4 - use router.isReady
    if (router.isReady) {
      fetchJob();
    }
  }, [router.isReady, id]);

  const fetchJob = async () => {
    try {
      const data = await getJob(id);
      setJob(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  //Display spinner if loading
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
        <ApplyJobForm job={job}></ApplyJobForm>
      </Container>
      <Container sx={{ marginTop: "1rem" }}>
        <ApplyJobDetails job={job} />
      </Container>
    </main>
  );
}
