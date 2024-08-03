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

      <TextField
        id="outlined-basic"
        label="Number of books"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 4 }}
        value={books}
        onChange={(e) => {
          setBooks(e.target.value);
        }}
      />

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
        >
          <MenuItem value="Google">Google</MenuItem>
          <MenuItem value="Instagram">Instagram</MenuItem>
          <MenuItem value="Facebook">Facebook</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

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
