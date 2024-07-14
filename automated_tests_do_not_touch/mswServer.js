import { BASE_URL } from '../utils/api/jobs.js';  

import { http, HttpResponse  } from 'msw'; // this will essentially mock the rest calls.
import { setupServer } from 'msw/node'; // we'll set up a "mocked" server

import allJobsJson from '../prisma-backend-tools/jobs.json'

const allEndpoints = [
  http.get(`${BASE_URL}/api/jobs`, (req, res, ctx) => {
    // respond using a mocked JSON body
    return HttpResponse.json(
      allJobsJson["job_postings"]
    )
  }),
  http.get(`${BASE_URL}/api/saved-jobs`, (req, res, ctx) => {
    // respond using a mocked JSON body
    // this is a mock of the last two jobs in the list being saved.
    return HttpResponse.json(
      [
        {
          "id": 26,
          "jobId": 35,
          "createdAt": "2024-05-28T16:59:58.879Z"
        },
        {
          "id": 27,
          "jobId": 36,
          "createdAt": "2024-05-28T16:59:59.598Z"
        }
      ]
    )
  }),
  http.get(`${BASE_URL}/api/saved-jobs-detail`, (req, res, ctx) => {
    // respond using a mocked JSON body
    // this is a mock of the last two jobs in the list being saved.
    return HttpResponse.json(
      [
        {
          "id": 39,
          "jobId": 2,
          "createdAt": "2024-06-07T18:49:00.761Z",
          "job": {
            "id": 2,
            "title": "AI Product Manager",
            "date_posted": "2024-04-18",
            "company": "AI Innovations Ltd.",
            "job_type": "Full-time",
            "location": "San Francisco, CA",
            "description": "We're looking for an experienced AI Product Manager to drive the development and commercialization of our AI-based products.",
            "qualifications": "Excellent communication and leadership skills"
          }
        }
      ]
    )
  }),
  http.post(`${BASE_URL}/api/saved-jobs`, (req, res, ctx) => {
    return HttpResponse.json(
      {id: 26, jobId: 2, createdAt: '2024-05-28T16:05:58.206Z'}
    )
  }),
  http.delete(`${BASE_URL}/api/saved-jobs`, (req, res, ctx) => {
    return HttpResponse.json(
      {id: 26, jobId: 2, createdAt: '2024-05-28T16:05:58.206Z'}
    )
  }),
  http.get(`${BASE_URL}/api/jobs/7`, (req, res, ctx) => {
    return HttpResponse.json(
      {
        "id": 7,
        "title": "Software Development Manager",
        "date_posted": "2024-04-13",
        "company": "TechLeaders Inc.",
        "job_type": "Full-time",
        "location": "San Jose, CA",
        "description": "Join our leadership team as a Software Development Manager and oversee the delivery of high-quality software products.",
        "qualifications": "Excellent communication and leadership skills"
      }
    )
  })
]

const server = setupServer(
  ...allEndpoints
);

export default server