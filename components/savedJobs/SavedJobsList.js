

import Typography from '@mui/material/Typography';

import SavedJobItem from './SavedJobItem';

export default function SavedJobsList({savedJobs}) {
  
  return <div style={{width: '100%'}}>
    {savedJobs.length === 0 &&
      <Typography variant="h5" component="div" sx={{padding: 2}}>
        No saved jobs
      </Typography>
    }
    {savedJobs.map((savedJob) => {
      return <SavedJobItem key={savedJob.id} savedJob={savedJob} />
    })}


  </div>
}