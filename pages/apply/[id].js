import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { getJob, postApplication } from "@/utils/api/jobs";
import ApplyJobDetails from "@/components/apply/ApplyJobDetails";
import ApplyJobForm from "@/components/apply/ApplyJobForm";
import { Grid, Typography } from "@mui/material";
import SuccessfulApplicationMessage from "@/components/apply/SuccessfulApplicationMessage";

export default function SavedJobsById() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittedApp, setSubmittedApp] = useState(false);

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
      console.error("Error fetching the job:", error);
    }
  };

  //pass handleApplyJobFormSubmit function as a submitCallback for the ApplyJobForm
  const handleApplyJobFormSubmit = async (application) => {
    try {
      //save the job to the api/applications endpoint
      await postApplication(application);
      setSubmittedApp(true);
    } catch (error) {
      console.error("Error saving application:", error);
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
        {submittedApp ? (
          <>
            <Grid item xs={12}>
              <SuccessfulApplicationMessage job={job} />
            </Grid>

            <Grid item xs={12} md={6}>
              <ApplyJobDetails job={job} />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} md={6}>
              <ApplyJobForm
                job={job}
                submitCallback={handleApplyJobFormSubmit}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ApplyJobDetails job={job} />
            </Grid>
          </>
        )}
        ;
      </Grid>
    </>
  );
}
