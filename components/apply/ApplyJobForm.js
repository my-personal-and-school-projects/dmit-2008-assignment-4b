import { Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import SuccessfulApplicationMessage from "./SuccessfulApplicationMessage";

export default function ApplyJobForm({ job, submitCallback }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [displayError, setDisplayError] = useState(false);
  const [submittedApp, setSubmittedApp] = useState(false);

  async function onHandleSubmitAppForm(e) {
    e.preventDefault();
    setError(null);

    if (fullName === "" || email === "") {
      setError("Please provide requested information below");
      setDisplayError(true);
      return;
    }
    setSubmittedApp(true);

    const newApp = {
      jobId: job.id,
      fullName,
      email,
    };

    /*  try {
      const data = await postApplication(newApp);
      setSubmittedApp(true);
    } catch (error) {
      console.error("Error saving job:", error);
    } */
  }

  return (
    <>
      {submittedApp ? (
        <SuccessfulApplicationMessage job={job} />
      ) : (
        <>
          {error ? (
            <Container
              style={{ paddingLeft: "0", width: "100%", marginLeft: 0 }}
            >
              <ErrorMessage show={displayError} errorMessage={error} />
            </Container>
          ) : null}
          <form style={{ width: `90%` }} onSubmit={onHandleSubmitAppForm}>
            <Stack direction="column" spacing={2}>
              <TextField
                id="full-name"
                label="Full Name"
                variant="outlined"
                fullWidth
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextField
                id="email"
                label="email"
                variant="outlined"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button variant="contained" color="success" type="submit">
                Submit Application
              </Button>
            </Stack>
          </form>
        </>
      )}
    </>
  );
}
