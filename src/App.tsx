import { Container, Paper, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRef } from "react";

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      files = files.filter((file: any) => file.type === "application/pdf"); // Only keep PDF files
      console.log(files); // Do something with the files
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let files = Array.from(e.target.files);
      files = files.filter((file: any) => file.type === "application/pdf"); // Only keep PDF files
      console.log(files); // Do something with the files
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <>
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
            sx={{ 
              backgroundColor: "transparent", 
              color: "white", 
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
              border: "0px",
              boxShadow: "0px 0px 6px 0px",
              transition: "background-color 0.8s, box-shadow 0.8s, color 0.8s, transform 0.8s"
            }}
          >
            <p style={{
              margin: 0,
              padding: 10,
              textAlign: "center",
              textWrap: "wrap",
            }}>
            Drag and drop your PDF files here
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
    </>
  );
}

export default App;
