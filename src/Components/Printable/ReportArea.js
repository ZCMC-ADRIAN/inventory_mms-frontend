import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import localApi from "../../API/Api";
import { Button, SimpleGrid, GridItem, theme, color } from "@chakra-ui/react";
import "./Report.css";
import Select from "react-select";

function ReportArea() {
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

  const generatePDF = () => {
    // create a new PDF instance
    const doc = new jsPDF("landscape", "in", "a4");

    // define the columns for the table
    const columns = [
      "No",
      "Article",
      "Descrtiption",
      "Property No",
      "Qty",
      "Unit",
      "Unit Value",
      "Total Value",
      "Date Acquired",
      "Location",
      "Person Responsible",
      "Date Repaired",
      "Date Returned",
      "Remarks",
    ];

    const headStyles = {
      fontSize: 9,
      halign: "center",
      fillColor: '#fff',
      textColor: '#000'
     };

    // Define the table options
    var tableOptions = {
      startY: 1,
    };

    // map through the data and extract the values for each row
    const rows = data.map((item, index) => {
      const num = index + 1;
      let temp = "";
      {
        item.property.map((det) => {
          temp += det.property_no === null ? "" : (temp += det.property_no);
        });
      }
      return [
        num,
        item.article,
        item.desc,
        temp,
        item.qty,
        item.unit,
        item.cost,
        item.total,
        item.Delivery_date,
        item.location,
        item.person,
      ];
    });

    // add the table to the PDF document
    doc.text(0.6, 0.6, selectLoc);

    doc.autoTable({
      head: [columns],
      body: rows,
      headStyles: headStyles,
      startY: tableOptions.startY,
      styles: {
        halign: 'center',
        lineWidth: 0.01,
        lineColor: [0, 0, 0],
        textColor: '#000'
      }
    });
  
    // save the PDF document
    window.open(doc.output("bloburl"));
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
            color='#fff'
            _hover={{ bg: "#74b369" }}
            onClick={generatePDF}
          >
            Generate
          </Button>
        </GridItem>
      </SimpleGrid>

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
              <td style={{ width: "220px" }}>{item.desc}</td>
              {item.property.map((det) => {
                return <td style={{ width: "200px" }}>{det.property_no}</td>;
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
  );
}

export default ReportArea;
