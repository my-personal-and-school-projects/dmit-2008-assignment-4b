import prisma from "@/prisma-backend-tools/localClient";


export default async function handler(req, res) {
  // get requests only.
  if (req.method === 'GET') {
    // Process a POST request
    return await getSavedJobs(req, res);
  } else if (req.method === 'POST') {
    return await postSavedJob(req, res);
  } else if (req.method === 'DELETE') {
    return await deleteSavedJob(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed, please use GET' });
  }

}

const postSavedJob = async (req, res) => {
  try {
    // parse the body of the request
    const { jobId } = req.body;

    // Create a new saved job record in the database
    const savedJob = await prisma.savedJob.create({
      data: {
        jobId: parseInt(jobId),
      },
    });

    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Error saving job:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}

const getSavedJobs = async (req, res) => {
  try {
    // Fetch all saved job records from the database
    const savedJobs = await prisma.savedJob.findMany();

    res.json(savedJobs);
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}

const deleteSavedJob = async (req, res) => {
  try {
    // parse the body of the request
    const { id } = req.body;

    // Delete the saved job record from the database
    const deletedJob = await prisma.savedJob.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json(deletedJob);
  } catch (error) {
    console.error('Error deleting saved job:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}
