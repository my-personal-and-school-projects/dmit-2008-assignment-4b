import { Box } from "@mui/material";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { deleteApplication, getJob } from "@/utils/api/jobs";
import { useRouter } from "next/router";

export default function ApplicationItem({ application }) {
  const [jobTitle, setJobTitle] = useState(null);
  const router = useRouter();

  //Get the job title
  useEffect(() => {
    const fetchJobTitle = async () => {
      try {
        const appJobTitle = await getJob(application.jobId);
        setJobTitle(appJobTitle.title);
      } catch (error) {
        console.error("Error fetching job title:", error);
      }
    };
    fetchJobTitle();
  }, [application.jobId]);

  //delete application
  const handleDeleteApp = async () => {
    try {
      await deleteApplication(application.id);
      router.reload();
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };
  return (
    <main>
      <Card variant="outlined" sx={{ marginBottom: 2, width: "90%" }}>
        <Box sx={{ p: 2 }} display="flex">
          <Box sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
              {jobTitle}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="text.secondary"
              component="div"
            >
              <strong>Full Name:</strong> {application.fullName}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="text.secondary"
              component="div"
            >
              <strong>email:</strong> {application.email}
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={handleDeleteApp}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Card>
    </main>
  );
}
