import prisma from "@/prisma-backend-tools/localClient";


export default async function handler(req, res) {
  // get requests only.
  if (req.method !== 'GET') {
    // Process a POST request
    return res.status(405).json({ error: 'Method not allowed, please use GET' });
  }

  try {

    const { q } = req.query;
    if (!q) {
    
      const jobs = await prisma.job.findMany();
      res.status(200).json(jobs);
      return
    }

    // Construct the query based on the provided parameters
    const jobs = await prisma.job.findMany({
      where:{
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
        ]
      }
    });

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error searching for jobs:', error);
    res.status(500).json({ error: 'An internal server error occurred' });

  }
}

