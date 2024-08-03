import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [books, setBooks] = React.useState("");
  const [source, setSource] = React.useState("");

  const handleChange = (event) => {
    setSource(event.target.value);
  };

  const navigate = useNavigate();

  return (
    <div className="main">
      <TextField
        id="outlined-basic"
        label="Names"
        variant="outlined"
        fullWidth
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
        sx={{ marginBottom: 4 }}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Number of Books</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={books}
          label="How did you know about us?"
          onChange={(e) => {
            setBooks(e.target.value);
          }}
          sx={{ marginBottom: 4 }}
        >
          <MenuItem value="Google">1</MenuItem>
          <MenuItem value="Instagram">2</MenuItem>
          <MenuItem value="Facebook">3</MenuItem>
          <MenuItem value="Other">4</MenuItem>
          <MenuItem value="Other">5</MenuItem>
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
          onChange={handleChange}
          sx={{ marginBottom: 4 }}
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
        sx={{ marginBottom: 4 }}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <TextField
        id="outlined-basic"
        label="Academic year"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 4 }}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <Button
        variant="contained"
        sx={{ marginTop: 5 }}
        onClick={() => navigate("/qrcode")}
      >
        Next
      </Button>
    </div>
  );
};

export default Main;
