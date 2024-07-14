import 'isomorphic-fetch' // needed for no "fetch is not defined errors
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'

import { http, HttpResponse  } from 'msw'; // this will essentially mock the rest calls.

import { BASE_URL } from '../utils/api/jobs.js';  

import JobApplication from '@/pages/apply/[id].js';

import server from './mswServer.js';

beforeAll(() => {
    server.listen();
});

afterAll(() => {
    server.close();
});

const pushLink = jest.fn();

const TEST_JOB_ID = 7

beforeEach(() => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');

  useRouter.mockReturnValue({
    route: '/',
    pathname: '/',
    query: { id:  TEST_JOB_ID}, // this is the same as the jobId in the mock data in mswServer.js
    asPath: '/',
    push: pushLink,
    reload: jest.fn(),
    replace: jest.fn(),
  });
})


describe("JobApplication", () => {
  test("renders the job application form properly", async () => {
    const { container } = render(<JobApplication />)
    await waitFor(() => {
      expect(container).toHaveTextContent(/Software Development Manager/i)
      expect(container).toHaveTextContent(/Full-time/i)
      expect(container).toHaveTextContent(/San Jose, CA/i)
      expect(container).toHaveTextContent(/Join our leadership team as a Software Development Manager and oversee the delivery of high-quality software products./i)
      expect(container).toHaveTextContent(/Excellent communication and leadership skills/i)
    })
  })

  test("submits the job application properly", async () => {
    const { container } = render(<JobApplication />)
    let postedData = {}

    server.use(
      http.post(`${BASE_URL}/api/applications`, async (req, res, ctx) => {
        // set the posted body to a variable so we can check it later
        postedData = await req.request.json()

        return HttpResponse.json(
          {id: 26, jobId: 7, createdAt: '2024-05-28T16:05:58.206Z'}
        )
      })
    )

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    await waitFor(async () => {
      let form = container.querySelector('form')

      let nameInput = container.querySelector('#full-name')
      let emailInput = container.querySelector('#email')

      if (nameInput && emailInput) {
        const TEST_NAME = 'John Doe'
        const TEST_EMAIL = 'john.doe@test.com'

        fireEvent.change(nameInput, { target: { value: TEST_NAME } })
        fireEvent.change(emailInput, { target: { value: TEST_EMAIL } })

        form.submit()
        // you need this for things to set properly.
        await sleep(100)

        expect(postedData).toEqual(
          { jobId: TEST_JOB_ID, fullName: TEST_NAME, email: TEST_EMAIL }
        )
      }
    })
  })
})
