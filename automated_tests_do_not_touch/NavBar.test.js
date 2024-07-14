import 'isomorphic-fetch' // needed for no "fetch is not defined errors
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'

import NavBar from '@/components/NavBar.js';

describe("NavBar", () => {
  test("renders the NavBar properly", async () => {
    const { container } = render(<NavBar />)
    await waitFor(() => {
      expect(container).toHaveTextContent(/Job Board/i)
      expect(container).toHaveTextContent(/Saved Jobs/i)
      expect(container).toHaveTextContent(/Applications/i)
    })
  })

  test("navigates to the saved jobs page properly", async () => {
    render(<NavBar />)
    await waitFor(() => {
      let savedJobsLink = screen.getByText(/Saved Jobs/i)
      expect(savedJobsLink.href).toContain('/saved-jobs')
    })
  })

  test("navigates to the applications page properly", async () => {
    render(<NavBar />)
    await waitFor(() => {
      let applicationsLink = screen.getByText(/Job Board/i)
      // note there's no port because this is going through the testing site.
      expect(applicationsLink.href).toContain('http://localhost/')
    })
  })
})
