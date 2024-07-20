import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { getJob } from "@/utils/api/jobs";
import ApplyJobDetails from "@/components/apply/ApplyJobDetails";
import ApplyJobForm from "@/components/apply/ApplyJobForm";
import { Grid, Typography } from "@mui/material";

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
        <Grid container spacing={2} style={{ paddingLeft: "2.5rem" }}>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ paddingTop: 2, paddingBottom: 2 }}>
              Apply for a Job
            </Typography>
          </Grid>
        </Grid>
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
    <>
      <NavBar />
      <Grid container spacing={2} style={{ paddingLeft: "2.5rem" }}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ paddingTop: 2, paddingBottom: 2 }}>
            Apply for a Job
          </Typography>
          <Typography>Enter your details to apply for the job</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <ApplyJobForm job={job} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ApplyJobDetails job={job} marg />
        </Grid>
      </Grid>
    </>
  );
}
