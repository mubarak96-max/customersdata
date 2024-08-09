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
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const Main = () => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [books, setBooks] = React.useState("");
  const [source, setSource] = React.useState("");
  const [school, setSchool] = React.useState("");
  const [saleAmount, setSaleAmount] = React.useState("");
  const [academicYear, setAcademicYear] = React.useState("");
  const [saleType, setSaleType] = React.useState("");
  const [error, setError] = React.useState("");
  const [showError, setShowError] = React.useState(false);
  const [showSuccess, setShowShowSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    setSource(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (name === "") {
      setError("Name is required");
      setShowError(true);
    } else if (source === "") {
      setError("Please how did you know about us?");
      setShowError(true);
    } else if (saleType === "") {
      setError("Select the sale type!");
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
          school,
          saleType,
          saleAmount,
          createdAt: serverTimestamp()
        };

        setLoading(true);
        setError("");
        setShowError(false);

        await addDoc(collection(db, "customers"), data);

        setLoading(false);

        if (saleType === "Free Books") {
          navigate("/qrcode");
        } else {
          setShowShowSuccess(true);

          setTimeout(() => {
            setSaleType("");
            setShowError(false);
            setShowShowSuccess(false);
            setName("");
            setPhone("");
            setEmail("");
            setSource("");
            setSaleAmount("");
          }, 3000);
        }
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
        // size="small"
        sx={{ marginBottom: 2.5 }}
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
        // size="small"
        sx={{ marginBottom: 2.5 }}
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
        // size="small"
        sx={{ marginBottom: 2.5 }}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <FormControl fullWidth>
        <InputLabel sx={{}} id="demo-simple-select-label">
          Sale type
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={saleType}
          // size="small"
          label="Sale Type"
          onChange={(e) => {
            setSaleType(e.target.value);
          }}
          sx={{ marginBottom: 2.5 }}
        >
          <MenuItem value="Selling">Selling</MenuItem>
          <MenuItem value="Free Books">Free Books</MenuItem>
        </Select>
      </FormControl>
      {saleType === "Selling" && (
        <TextField
          id="outlined-basic"
          label="Sale Amount"
          variant="outlined"
          fullWidth
          // size="small"
          sx={{ marginBottom: 2.5 }}
          value={saleAmount}
          onChange={(e) => {
            setSaleAmount(e.target.value);
          }}
        />
      )}

      {saleType === "Free Books" && (
        <FormControl fullWidth>
          <InputLabel sx={{}} id="demo-simple-select-label">
            Number of Books
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={books}
            // size="small"
            label="How did you know about us?"
            onChange={(e) => {
              setBooks(e.target.value);
            }}
            sx={{ marginBottom: 2.5 }}
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
          </Select>
        </FormControl>
      )}

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          How did you know about us?
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={source}
          label="How did you know about us?"
          // size="small"
          onChange={handleChange}
          sx={{
            marginBottom: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <MenuItem value="Google">Google</MenuItem>
          <MenuItem value="Instagram">Instagram</MenuItem>
          <MenuItem value="Facebook">Facebook</MenuItem>
          <MenuItem value="Walk In">Walk In</MenuItem>
          <MenuItem value="Regular Customer">Regular Customer</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      {saleType === "Free Books" && (
        <TextField
          id="outlined-basic"
          label="School/College/University"
          variant="outlined"
          fullWidth
          // size="small"
          sx={{ marginBottom: 2.5 }}
          value={school}
          onChange={(e) => {
            setSchool(e.target.value);
          }}
        />
      )}

      {saleType === "Free Books" && (
        <TextField
          id="outlined-basic"
          label="Academic year"
          variant="outlined"
          fullWidth
          // size="small"
          sx={{ marginBottom: 2 }}
          value={academicYear}
          onChange={(e) => {
            setAcademicYear(e.target.value);
          }}
        />
      )}

      {showError && (
        <Alert sx={{ marginBottom: 2 }} severity="error">
          {error}
        </Alert>
      )}

      {showSuccess && (
        <Alert sx={{ marginBottom: 2 }} severity="success">
          Success
        </Alert>
      )}

      <Button
        variant="contained"
        sx={{ marginTop: -1 }}
        onClick={() => handleSubmit()}
        disabled={loading}
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
