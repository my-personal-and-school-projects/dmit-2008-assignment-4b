
import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

import BookmarkIcon from '@mui/icons-material/Bookmark';

import { postSavedJob } from '@/utils/api/jobs';

export default function JobItem({job, savedJobs, setSavedJobs}) {
  const router = useRouter();
  
  const [saved, setSaved] = useState(false);

  useEffect(()=> {
    let savedJobIds = savedJobs.map((job) => job.jobId)
    if(savedJobIds.includes(job.id)) {
      setSaved(true)
    } else {
      setSaved(false)
    }
  }, [job, savedJobs])

  const handleSaveJobClick = async () => {
    try {
      const data = await postSavedJob(job.id)
      setSaved(true)
      setSavedJobs([...savedJobs, data])
    } catch (error) {
      console.error('Error saving job:', error);
    }
  }


  return <>
    <Card variant="outlined" sx={{ marginBottom: 2, width: "90%"}}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h6" component="div">
            {job.title}
          </Typography>
          <Typography gutterBottom variant="body2"  color="text.secondary" component="div">
            {job.job_type} • {job.location}
          </Typography>
        </Stack>
        <Typography  variant="body1">
          Description
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {job.description}
        </Typography>
        <Typography sx={{marginTop: 1}} variant="body1">
          Qualifications
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {job.qualifications}
        </Typography>
        <CardActions sx={{ justifyContent: 'flex-end', padding: 0, marginTop: 2 }}>
          <Button
            startIcon={<BookmarkIcon/>}
            variant="contained"
            onClick={handleSaveJobClick}
            disabled={saved}
          >
            {saved ? "Saved": "Save for later"}
          </Button>
        </CardActions>
      </Box>
    </Card>
  </>
}
