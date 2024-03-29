import React, { useState, useEffect } from "react";
import localApi from "../../API/Api";
import { jsPDF } from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
import "../QRCode.css";
import { Button, SimpleGrid, GridItem, theme, color } from "@chakra-ui/react";
import Select from "react-select";

export default function MassPrinting() {
  const [selectLoc, setSelectLoc] = useState("");
  const [location, setLocation] = useState([]);
  const [data, setData] = useState([]);
  const [pdfGenerated, setPdfGenerated] = useState(false); // Added state for PDF generation

  const fetchData = async () => {
    let responseLocation = await localApi.get("locations");
    setLocation(responseLocation.data);

    let responseId = await localApi.get("qr", {
      params: { location: selectLoc },
    });
    setData(responseId.data);
  };

  useEffect(() => {
    fetchData();
  }, [selectLoc]);

  const SIZE = "300x300";

  const getImageSrc = (data) => {
    const content = `Equipment:${data.desc}%0AProperty No:${
      data.property_no != null ? data.property_no : "None"}%0ASerial No: ${data.serial != null ? data.serial.toString() : 'None'}%0AClassification: ${data.itemCateg_name != null ? data.itemCateg_name.toString() : 'None'}%0ADate Acquired: ${data.Delivery_date != null ? data.Delivery_date.toString() : 'None'}%0ASection Assigned: ${data.location_name != null ? data.location_name.toString() : 'None'}`;

    const URL = `https://chart.googleapis.com/chart?chs=${SIZE}&cht=qr&chl=${content}&choe=UTF-8`;
    return URL;
  };
  

  const handleDownload = () => {
    renderImagesPDF();
  };

  const renderImagesPDF = () => {
    const doc = new jsPDF(); // Create a new instance of jsPDF for each PDF generation
    let x = 0;
    let y = 10;
    let j = 0;
    let k = 0;
    let items = 0;
    const qrSize = 30;
    const A4pageWidth = 210;
    const A4pageHeight = 297;
    const vPadding = 10;

    for (let i = 0; i < data.length; ++i) {
      if (items >= 63) {
        doc.addPage();
        x = 0;
        y = 10;
        j = 0;
        k = 0;
        items = 0;
      }
      let imageData = new Image(300, 300);
      imageData.src = getImageSrc(data[i]);
      doc.addImage(imageData, "PNG", x, y, qrSize, qrSize);
      doc.setFontSize(16);
      items++;
      if (x >= A4pageWidth - qrSize) {
        x = 0;
        k = 0;
        y = ++j * qrSize + vPadding;
      } else {
        x = ++k * qrSize;
      }
    }

    doc.save(`${selectLoc} - QR.pdf`);
  };

  const renderImagesScreen = () => {
    return data.map((tag) => (
      <img
        key={tag.Pk_inventoryId}
        alt={tag.Pk_inventoryId}
        src={getImageSrc(tag)}
        className="qr"
      />
    ));
  };

  return (
    <div>
      <SimpleGrid columns={6} columnGap={3} p={10}>
        <GridItem colSpan={1}>
          <Select
            class="select"
            options={location.map((det) => {
              return { value: det.location_name, label: det.location_name };
            })}
            onChange={(e) => setSelectLoc(e.label, e.value)}
            placeholder="Select Area"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Button
            bg="#91C788"
            color="#fff"
            _hover={{ bg: "#74b369" }}
            onClick={handleDownload}
          >
            Generate
          </Button>
        </GridItem>
      </SimpleGrid>
      <div className="qr-container">
        <div className="qr-code">{renderImagesScreen()}</div>
      </div>
    </div>
  );
}
