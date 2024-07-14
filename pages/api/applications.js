import prisma from "@/prisma-backend-tools/localClient";
const { z } = require('zod');

const applicationSchema = z.object({
  jobId: z.number().int().nonnegative('jobId must be a non-negative integer'),
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
});

export default async function handler(req, res) {
  // get requests only.
  if (req.method === 'GET') {
    // Process a POST request
    return await getApplications(req, res);
  } else if (req.method === 'POST') {
    // return await postSavedJob(req, res);
    return await postApplication(req, res);
  } else if (req.method === 'DELETE') {
    return await deleteApplication(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed, please use GET' });
  }

}

const getApplications = async (req, res) => {
  try {
    // Fetch all saved job records from the database
    const savedJobs = await prisma.jobApplications.findMany();

    res.json(savedJobs);
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}

const postApplication = async (req, res) => {
  try {

    const parsedData = applicationSchema.parse(req.body);
    // parse the body of the request
    const { jobId, fullName, email } = parsedData;

    // Create a new saved job record in the database
    const savedJob = await prisma.jobApplications.create({
      data: {
        jobId: parseInt(jobId),
        fullName: fullName,
        email: email
      },
    });

    res.status(201).json(savedJob);
  } catch (error) {

    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }

    console.error('Error saving job:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}

const deleteApplication = async (req, res) => {
  try {
    // parse the body of the request
    const { id } = req.body;

    // Delete the application record from the database
    const deletedJob = await prisma.jobApplications.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json(deletedJob);
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}
