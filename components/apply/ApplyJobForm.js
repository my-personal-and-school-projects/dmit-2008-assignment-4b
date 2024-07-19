import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function ApplyJobForm({ job, submitCallback }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  function onHandleSubmitAppForm() {
    if (fullName === "") {
    }
    if (email === "") {
    }
  }

  return (
    <form style={{ width: `90%` }}>
      <Stack direction="column" spacing={2}>
        <TextField
          id="full-name"
          label="Full Name"
          variant="outlined"
          fullWidth
        />
        <TextField id="email" label="email" variant="outlined" fullWidth />
        <Button variant="contained" color="success" type="submit">
          Submit Application
        </Button>
      </Stack>
    </form>
  );
}
