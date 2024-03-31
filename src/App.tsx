import {
  Container,
  Paper,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRef, useState } from "react";
import axios from "axios";

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      let files = Array.from(e.dataTransfer.files);
      files = files.filter((file: any) => file.type === "application/pdf");
      console.log(files);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLoading(true);
      let files = Array.from(e.target.files);
      files = files.filter((file: any) => file.type === "application/pdf"); // Only keep PDF files
      const formData = new FormData();
      formData.append("file", files[0]);
      try {
        const response = await axios.post(
          "http://localhost:3000/fetch-jobs",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setJobs(response.data.jobs);
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {loading ? (
        <Container
          disableGutters
          sx={{
            minWidth: "100%",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Container>
      ) : (
        <Container
          disableGutters
          sx={{
            minWidth: "100%",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              margin: 2,
              padding: 2,
              minWidth: "30vw",
              minHeight: "30vh",
              border: "8px dotted #a8a5a5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleClick}
              disableElevation
              sx={{
                backgroundColor: "transparent",
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#a8a5a5",
                  color: "black",
                  transform: "scale(1.01)",
                },
                boxShadow: "0px",
                border: "0px",
                transition:
                  "background-color 0.8s, box-shadow 0.8s, color 0.8s, transform 0.8s",
              }}
            >
              <p
                style={{
                  margin: 0,
                  padding: 10,
                  textAlign: "center",
                  textWrap: "wrap",
                  border: "0px",
                  textShadow: "0px 0px 6px 0px",
                }}
              >
                Drag/Select and drop your PDF files here
              </p>
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              accept=".pdf"
              onChange={handleFileSelect}
            />
          </Paper>
        </Container>
      )}
      <Container
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          minWidth: "100%",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
        }}
      >
        {jobs.map((job, index) => (
          <Card
            key={index}
            sx={{
              margin: 2,
              padding: 0,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <CardContent
              sx={{
                flex: "1 0 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: { xs: "center", md: "flex-start" },
                padding: 2,
                minWidth: { xs: "100%", md: "30vw" },
                minHeight: { xs: "auto", md: "30vh" },
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  textAlign: { xs: "center", md: "left" },
                  textDecoration: "underline",
                  textDecorationColor: "white",
                  fontWeight: "bold",
                  textWrap: "wrap",
                }}
              >
                {job.job_title}
              </Typography>
            </CardContent>
            <CardContent
              sx={{
                flex: "1 0 auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: { xs: "center", md: "flex-start" },
                padding: 2,
                minWidth: { xs: "100%", md: "40vw" },
                minHeight: { xs: "auto", md: "30vh" },
              }}
            >
              <Typography variant="h5" color="text.secondary">
                Company:{" "}
                <a
                  href={job.company_url}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  {job.company_name}
                </a>
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Location: {job.job_location}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Job Link:{" "}
                <a
                  href={job.linked_url}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  Link
                </a>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default App;
