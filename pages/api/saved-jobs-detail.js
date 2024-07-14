import prisma from "@/prisma-backend-tools/localClient";


export default async function handler(req, res) {
  try {
    // Fetch all saved job records from the database
    // also display the nested job details.
    const savedJobs = await prisma.savedJob.findMany({
      include: {
        job: true,
      },
    });

    res.json(savedJobs);
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}
