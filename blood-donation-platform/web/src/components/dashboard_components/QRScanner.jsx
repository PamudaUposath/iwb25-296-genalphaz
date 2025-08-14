import React from "react";
import { QrReader } from "react-qr-reader";

export default function QRScanner() {
  const handleScan = (result, error) => {
    if (!!result) {
      console.log(result?.text);
    }
    if (!!error) {
      console.error(error);
    }
  };

  return (
    <div style={{ width: "300px" }}>
      <QrReader
        constraints={{ facingMode: "environment" }}
        onResult={handleScan}
        style={{ width: "100%" }}
      />
    </div>
  );
}
