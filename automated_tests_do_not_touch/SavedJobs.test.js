import 'isomorphic-fetch' // needed for no "fetch is not defined errors
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'

import { http, HttpResponse  } from 'msw'; // this will essentially mock the rest calls.

import { BASE_URL } from '../utils/api/jobs.js';  

import SavedJobs from '@/pages/saved-jobs';

import server from './mswServer.js';

beforeAll(() => {
    server.listen();
});

afterAll(() => {
    server.close();
});


const pushLink = jest.fn();

beforeEach(() => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');

  useRouter.mockReturnValue({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: pushLink,
    reload: jest.fn(),
    replace: jest.fn(),
  });
})

describe("SavedJobs", () => {
  test("renders all the saved jobs properly", async () => {
    let { container } = render(<SavedJobs />)
    
    await waitFor(() => {
      const CARD_SELECTOR = ".MuiCard-root"
      let cards = container.querySelectorAll(CARD_SELECTOR)
      expect(cards[0]).toHaveTextContent(/AI Product Manager/i)
      expect(cards.length).toBe(1)
    })
  })

  test("navigates to the apply page properly", async () => {
    render(<SavedJobs />)
    await waitFor(() => {
      let applyButton = screen.getByText(/Apply/i)
      fireEvent.click(applyButton)
      expect(pushLink).toHaveBeenCalledWith('/apply/2')
    })
  })

  test("deletes a saved job properly", async () => {
    render(<SavedJobs />)
    
    let deleteButtonClicked = false
    server.use(
      http.delete(`${BASE_URL}/api/saved-jobs`, (req, res, ctx) => {
        deleteButtonClicked = true
        return HttpResponse.json(
          {id: 26, jobId: 2, createdAt: '2024-05-28T16:05:58.206Z'}
        )
      })
    )

    await waitFor(() => {
      let deleteButton = screen.getByText(/Delete/i)
      fireEvent.click(deleteButton)
      expect(deleteButtonClicked).toBe(true)
    })
  })

})
