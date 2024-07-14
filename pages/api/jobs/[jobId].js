import prisma from "@/prisma-backend-tools/localClient";


export default async function handler(req, res) {
  // get requests only.
  if (req.method !== 'GET') {
    // Process a POST request
    return res.status(405).json({ error: 'Method not allowed, please use GET' });
  }
  
  try {
    const { jobId } = req.query

    const job = await prisma.job.findUnique({
      where: {
        id: parseInt(jobId)
      }
    });

    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    res.status(200).json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}
