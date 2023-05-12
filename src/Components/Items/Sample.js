import React, { useState, useEffect } from "react";

function BarCode() {
  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    function handleBarcodeScanned(event) {
      setBarcode(event.data);
    }

    window.addEventListener("keypress", handleBarcodeScanned);

    return () => {
      window.removeEventListener("keypress", handleBarcodeScanned);
    };
  }, []);

  return (
    <div>
      <input type="text" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
    </div>
  );
}

export default BarCode;
