import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function SuccessfulApplicationMessage({job}) {
  return <Alert severity="success">
    <AlertTitle>Successfully Applied!</AlertTitle>
    You have successfully applied for the job: {job.title}
  </Alert>
}
