import React, { useState } from "react";
import { QrReader } from "react-qr-scanner"; // Updated import

export default function QRScanner() {
  const [data, setData] = useState("No result"); // store scanned result

  return (
    <div style={{ width: "300px" }}>
      <QrReader
        onResult={(result, error) => {
          if (result) setData(result?.text); // update state on scan
          if (error) console.error(error);   // handle errors
        }}
        constraints={{ facingMode: "environment" }}
        style={{ width: "100%" }}
      />
      <p>Result: {data}</p> {/* display scanned result */}
    </div>
  );
}
