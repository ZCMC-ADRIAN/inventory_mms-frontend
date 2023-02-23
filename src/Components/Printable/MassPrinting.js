import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import QRCode from "qrcode.react";
import localApi from "../../API/Api";
import { Button, SimpleGrid, GridItem } from "@chakra-ui/react";
import Select from "react-select";

const MassPrinting = () => {
  const [selectLoc, setSelectLoc] = useState("");
  const [location, setLocation] = useState([]);

  const fetchData = async () => {
    let responseLocation = await localApi.get("locations");
    setLocation(responseLocation.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const download_pdf = () => {
    html2canvas(document.getElementById("generate"), { scale: 2 }).then(
      (canvas) => {
        const image = { type: "png", quality: 5 };
        const margin = [0.2, 0.2];

        var imgWidth = 15.4;
        var pageHeight = 10.7;

        var innerPageWidth = imgWidth - margin[0] * 2;
        var innerPageHeight = pageHeight - margin[1] * 2;

        // Calculate the pages.
        var pxFullHeight = canvas.height;
        var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
        var nPages = Math.ceil(pxFullHeight / pxPageHeight);

        var pageHeight = innerPageHeight;

        // Create a one-page canvas to split up the full image.
        var pageCanvas = document.createElement("canvas");
        var pageCtx = pageCanvas.getContext("2d");
        pageCanvas.width = canvas.width;
        pageCanvas.height = pxPageHeight;

        // Initialize the PDF.
        var pdf = new jsPDF("portrait", "in", "a4");

        for (var page = 0; page < nPages; page++) {
          // Display the page.
          var w = pageCanvas.width;
          var h = pageCanvas.height;
          pageCtx.fillStyle = "white";
          pageCtx.fillRect(0, 0, w, h);
          pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

          // Add the page to the PDF.
          if (page > 0) pdf.addPage();
          debugger;
          var imgData = pageCanvas.toDataURL(
            "image/base64" + image.type,
            image.quality
          );
          pdf.addImage(
            imgData,
            image.type,
            margin[1],
            0.5,
            innerPageWidth,
            pageHeight
          );
        }

        window.open(pdf.output("bloburl"));
      }
    );
  };

  return (
    <div>
      <SimpleGrid columns={4} columnGap={3}>
        <GridItem colSpan={2}>
        </GridItem>
      </SimpleGrid>
    </div>
  );
};

export default MassPrinting;
