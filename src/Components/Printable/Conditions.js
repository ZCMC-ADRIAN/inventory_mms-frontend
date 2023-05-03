import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import localApi from "../../API/Api";
import { Button, SimpleGrid, GridItem } from "@chakra-ui/react";
import "./Report.css";
import Select from "react-select";

const Conditions = () => {
  const [data, setData] = useState([]);
  console.log(data)

  const fetchData = async () => {
    let responseData = await localApi.get("report/not-found");
    setData(responseData.data);
  };

  useEffect(() => {
    fetchData();
  },[]);

  const generatePDF = () => {
    const doc = new jsPDF("landscape", "in", "a4");

    const columns = [
      "No",
      "Article",
      "Description",
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
      fontSize: 8,
      halign: "center",
      fillColor: "#fff",
      textColor: "#000",
    };

    var tableOptions = {
      startY: 1,
    };

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

    doc.text(0.6, 0.6, 'Not Found Items');

    doc.autoTable({
      head: [columns],
      body: rows,
      headStyles: headStyles,
      startY: tableOptions.startY,
      styles: {
        halign: "center",
        lineWidth: 0.01,
        lineColor: [0, 0, 0],
        textColor: "#000",
        fontSize: 8
      },
    });

    window.open(doc.output("bloburl"));
  };

  return (
    <div>
      <SimpleGrid columns={6} columnGap={3} p={10}>
        <GridItem colSpan={1}>
          <Button
            bg="#91C788"
            color="#fff"
            _hover={{ bg: "#74B369" }}
            onClick={generatePDF}
          >
            Generate
          </Button>
        </GridItem>
      </SimpleGrid>

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
};

export default Conditions;
