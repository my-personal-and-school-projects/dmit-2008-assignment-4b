import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { deleteSavedJob } from "@/utils/api/jobs";

export default function SavedJobItem({ savedJob }) {
  const router = useRouter();

  //Step 3 - redirect to apply for this job on click
  function handleApplyBtnOnCLick() {
    router.push(`/apply/${savedJob.job.id}`);
    console.log(savedJob.job.id);
  }

  //Step 3 - Delete saved job
  const handleDeleteBtnOnCLick = async () => {
    try {
      await deleteSavedJob(savedJob.id);
      router.reload();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2, width: "90%" }}>
      <Box sx={{ p: 2 }} display="flex">
        <Box sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {savedJob.job.title}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            color="text.secondary"
            component="div"
          >
            {savedJob.job.job_type} • {savedJob.job.location}
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Button
            sx={{ mr: 1 }}
            size="small"
            color="success"
            variant="contained"
            onClick={handleApplyBtnOnCLick}
          >
            Apply
          </Button>

          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={handleDeleteBtnOnCLick}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
