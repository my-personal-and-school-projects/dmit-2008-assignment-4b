export const BASE_URL = "http://localhost:3000"

export const getJobs  = async () => {
  const response = await fetch(`${BASE_URL}/api/jobs`);
  const data = await response.json();
  return data;
}

export const getJob = async (jobId) => {
  const response = await fetch(`${BASE_URL}/api/jobs/${jobId}`);
  const data = await response.json();
  return data;
}

export const getSavedJobs = async () => {
  const response = await fetch(`${BASE_URL}/api/saved-jobs`);
  const data = await response.json();
  return data;
}

export const getSavedJobsDetails = async () => {
  const response = await fetch(`${BASE_URL}/api/saved-jobs-detail`);
  const data = await response.json();
  return data;
}

export const postSavedJob = async (jobId) => {
  const response = await fetch(`${BASE_URL}/api/saved-jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      { jobId: jobId }
    )
  })
  const data = await response.json();
  return data
}

export const deleteSavedJob = async (id) => {
  const response = await fetch(`${BASE_URL}/api/saved-jobs`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      { id: id }
    )
  })
  const data = await response.json();
  return data

}

export const postApplication = async (application) => {
  const response = await fetch(`${BASE_URL}/api/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(application)
  })
  const data = await response.json();
  return data
}

export const getApplications = async () => {
  const response = await fetch(`${BASE_URL}/api/applications`);
  const data = await response.json();
  return data;
}

export const deleteApplication = async (id) => {
  const response = await fetch(`${BASE_URL}/api/applications`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      { id: id }
    )
  })
  const data = await response.json();
  return data
}
