import React from "react";
import QRCode from "qrcode.react";
import { Button } from "@mui/material";

const QRCodePage = () => {
  const value = "https://g.page/r/CVH7IN-QWrZ6EBM/review";
  return (
    <div
      className="qrcode"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <QRCode size={275} value={value} />

      <Button
        variant="contained"
        sx={{ marginTop: 5, display: "block", textAlign: "center" }}
        onClick={() => (window.location.href = "/")}
      >
        Done
      </Button>
    </div>
  );
};

export default QRCodePage;
