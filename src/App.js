import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import QRCodePage from "./components/QRCode";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qrcode" element={<QRCodePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
