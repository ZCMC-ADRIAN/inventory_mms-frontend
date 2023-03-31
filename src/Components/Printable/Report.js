import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import localApi from "../../API/Api";
import { Button, SimpleGrid, GridItem } from "@chakra-ui/react";
import "./Report.css";
import Select from "react-select";

const Report = () => {
  const [selectLoc, setSelectLoc] = useState("");
  const [location, setLocation] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let responseLocation = await localApi.get("locations");
    setLocation(responseLocation.data);

    let responseId = await localApi.get("report", {
      params: { location: selectLoc },
    });
    setData(responseId.data);
  };

  useEffect(() => {
    fetchData();
  }, [selectLoc]);

  const download_pdf = () => {
    html2canvas(document.getElementById("generate"), { scale: 2 }).then(
      (canvas) => {
        const image = { type: "png", quality: 5 };
        const margin = [0.2, 0.2];

        var imgWidth = 12.5;
        var pageHeight = 7.5;

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
        var pdf = new jsPDF("landscape", "in", "a4");

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
      <SimpleGrid columns={6} columnGap={3} p={10}>
        <GridItem colSpan={1}>
          <Select
            class="select"
            options={location.map((det) => {
              return { value: det.location_name, label: det.location_name };
            })}
            onChange={(e) => setSelectLoc(e.label, e.value)}
            placeholder="Select Location"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Button
            bg="blue.200"
            _hover={{ bg: "blue.300 " }}
            onClick={download_pdf}
          >
            Generate
          </Button>
        </GridItem>
      </SimpleGrid>

      <div id='generate'>
        <div className="location">
          <p className="loc-text">{selectLoc}</p>
        </div>
        <table className="report-table">
          <tr className="report-header">
            <th>No</th>
            <th>Article</th>
            <th>Description</th>
            <th>Property No</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Unit Value</th>
            <th>Total Value</th>
            <th>Date Acquired</th>
            <th>Location</th>
            <th>Person Responsible</th>
            <th>Date Repaired</th>
            <th>Date Returned</th>
            <th>REMARKS</th>
          </tr>

          {data.map((item, index) => {
            const num = index + 1;
            return (
              <tr className="report-data">
                <td>{num}</td>
                <td>{item.article}</td>
                <td style={{width : '220px'}}>{item.desc}</td>
                {item.property.map((det) => {
                  return <td style={{width: '200px'}}>{det.property_no}</td>;
                })}
                <td>{item.qty}</td>
                <td>{item.unit}</td>
                <td>{item.cost}</td>
                <td>{item.total}</td>
                <td>{item.Delivery_date}</td>
                <td>{item.location}</td>
                <td>{item.person}</td>
                <td></td>
                <td></td>
                <td>{item.remarks}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Report;
