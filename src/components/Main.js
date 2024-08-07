import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./../assets/bookhero_logo.jpg";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const Main = () => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [books, setBooks] = React.useState("");
  const [source, setSource] = React.useState("");
  const [school, setSchool] = React.useState("");
  const [academicYear, setAcademicYear] = React.useState("");
  const [error, setError] = React.useState("");
  const [showError, setShowError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    setSource(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (name === "") {
      setError("Name is required");
      setShowError(true);
    } else if (phone === "") {
      setError("Phone number is required");
      setShowError(true);
    } else if (email === "") {
      setError("Email is required");
      setShowError(true);
    } else if (books === "") {
      setError("Please provide the number of books selected");
      setShowError(true);
    } else if (source === "") {
      setError("Please how did you know about us?");
      setShowError(true);
    } else if (academicYear === "") {
      setError("Tell us your academic year");
      setShowError(true);
    } else if (school === "") {
      setError("Tell us your school");
      setShowError(true);
    } else {
      try {
        const data = {
          name,
          email,
          phone,
          books,
          source,
          academicYear,
          school
        };

        setLoading(true);

        await addDoc(collection(db, "customers"), data);

        setLoading(false);
        setError("");
        setShowError(false);

        navigate("/qrcode");

        setTimeout(() => {}, 300);
      } catch (error) {
        console.log("Error", `Failed to upload due to ${error}`);

        // setLoading(false);
      }
    }
  };

  return (
    <div className="main">
      <img src={logo} alt="Description" className="logo" />
      <div className="text">
        <span>Welcome to BookHero Free</span>
        <span>Academic Books Project 24</span>
      </div>

      <TextField
        id="outlined-basic"
        label="Names"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ marginBottom: 4 }}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <TextField
        id="outlined-basic"
        label="Phone Number"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ marginBottom: 4 }}
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />

      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ marginBottom: 4 }}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <FormControl fullWidth>
        <InputLabel sx={{}} id="demo-simple-select-label">
          Number of Books
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={books}
          size="small"
          label="How did you know about us?"
          onChange={(e) => {
            setBooks(e.target.value);
          }}
          sx={{ marginBottom: 4 }}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          How did you know about us?
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={source}
          label="How did you know about us?"
          size="small"
          onChange={handleChange}
          sx={{
            marginBottom: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <MenuItem value="Google">Google</MenuItem>
          <MenuItem value="Instagram">Instagram</MenuItem>
          <MenuItem value="Facebook">Facebook</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        id="outlined-basic"
        label="School/College/University"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ marginBottom: 4 }}
        value={school}
        onChange={(e) => {
          setSchool(e.target.value);
        }}
      />

      <TextField
        id="outlined-basic"
        label="Academic year"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ marginBottom: 4 }}
        value={academicYear}
        onChange={(e) => {
          setAcademicYear(e.target.value);
        }}
      />

      {showError && (
        <Alert sx={{ marginBottom: 4 }} severity="error">
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        sx={{ marginTop: -2 }}
        onClick={() => handleSubmit()}
      >
        Next{" "}
        {loading && (
          <CircularProgress sx={{ marginLeft: 1 }} size={16} color="inherit" />
        )}
      </Button>
    </div>
  );
};

export default Main;
