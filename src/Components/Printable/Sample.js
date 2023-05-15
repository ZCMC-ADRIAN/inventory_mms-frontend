import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";
import "jspdf-autotable";
import localApi from "../../API/Api";
import { Button, SimpleGrid, GridItem, theme, color } from "@chakra-ui/react";
import "./Report.css";
import Select from "react-select";

function NoProperty() {
  const navigate = useNavigate()
  const [selectLoc, setSelectLoc] = useState("");
  const [location, setLocation] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let responseLocation = await localApi.get("locations");
    setLocation(responseLocation.data);

    let responseId = await localApi.get("no-property", {
      params: { location: selectLoc },
    });
    setData(responseId.data);
  };

  useEffect(() => {
    fetchData();
  }, [selectLoc]);

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
            onClick={()=>navigate('/home')}
          >
            Home
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
              <td>{item.property_no}</td>
              <td>{item.qty}</td>
              <td>{item.unit}</td>
              <td>{item.cost}</td>
              <td>{item.total}</td>
              <td>{item.Delivery_date}</td>
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

export default NoProperty;
