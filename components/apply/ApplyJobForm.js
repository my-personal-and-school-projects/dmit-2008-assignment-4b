import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export default function ApplyJobForm({ job, submitCallback }) {
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
