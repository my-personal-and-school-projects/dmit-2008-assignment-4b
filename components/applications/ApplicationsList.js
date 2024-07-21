import Typography from "@mui/material/Typography";
import ApplicationItem from "./ApplicationItem";

export default function ApplicationsList({ applications }) {
  return (
    <div style={{ width: "100%" }}>
      {applications.length === 0 && (
        <Typography variant="h5" component="div" sx={{ padding: 2 }}>
          No saved jobs
        </Typography>
      )}
      {applications.map((application) => {
        return (
          <ApplicationItem key={application.id} application={application} />
        );
      })}
    </div>
  );
}
