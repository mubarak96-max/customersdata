import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import QRCodePage from "./components/QRCode";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/qrcode" element={<QRCodePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
