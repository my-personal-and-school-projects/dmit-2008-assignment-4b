import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function SavedJobItem({savedJob}) {

  return <Card variant="outlined" sx={{ marginBottom: 2, width: "90%"}}>
    <Box sx={{ p: 2 }}  display="flex">
      <Box sx={{flexGrow: 1}}>
        <Typography gutterBottom variant="h5" component="div">
          {savedJob.job.title}
        </Typography>
        <Typography gutterBottom variant="body2"  color="text.secondary" component="div">
          {savedJob.job.job_type} • {savedJob.job.location}
        </Typography>
      </Box>
      <Box sx={{p: 2}}>
        <Button 
          sx={{mr: 1}} 
          size="small" 
          color="success" 
          variant="contained"
        >
          Apply
        </Button>
        <Button
          size="small"
          color="error"
          variant="contained"
        >
          Delete
        </Button>
      </Box>
    </Box>
  </Card>
}