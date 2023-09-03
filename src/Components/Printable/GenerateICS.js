import React, { useState, useEffect } from "react";
import localApi from "../../API/Api";
import {
  Button,
  SimpleGrid,
  GridItem,
  theme,
  color,
  Text,
} from "@chakra-ui/react";
import Select from "react-select";

function GenerateICS() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedICS, setSelectedICS] = useState("");
  const [ics, setIcs] = useState([]);
  const [data, setData] = useState([]);

  // console.log(data)

  const fetchData = async () => {
    let responseICS = await localApi.get("ics");
    setIcs(responseICS.data);

    const responseGenerate = await localApi.get("generate/ics", {
      params: { ics: selectedICS }
    });
    setData(responseGenerate.data);
  };

  useEffect(() => {
    fetchData();
  }, [selectedICS]);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      const responseGenerate = await localApi.get("generate/ics", {
        params: { ics: selectedICS },
        responseType: "blob",
      });
      setData(responseGenerate.data);

      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([responseGenerate.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "ICS.docx"; // Set the desired filename
      document.body.appendChild(a);
      a.click();
      a.remove();

      setIsDownloading(false);
    } catch (error) {
      console.error("Error downloading DOCX:", error);
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <SimpleGrid columns={6} columnGap={3} p={10}>
        <GridItem colSpan={1}>
          <Select
            class="select"
            options={ics.map((det) => {
              return { value: det.ics_number, label: det.ics_number };
            })}
            onChange={(e) => setSelectedICS(e.label, e.value)}
            placeholder="Select ICS"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Button
            bg="#91C788"
            color="#fff"
            _hover={{ bg: "#74b369" }}
            disabled={isDownloading}
            onClick={handleDownload}
            isdisabled={isDownloading}
          >
            {isDownloading ? "Generating..." : "Generate"}
          </Button>
        </GridItem>
      </SimpleGrid>

      <div className="par-table">
        <Text fontSize={12} mb={2}>Fund Cluster: Sample</Text>
        <Text fontSize={12} mb={2}>ICS No: 2023-08-0003</Text>
        <Text fontSize={12} mb={5}>Received By: Adrian A. Agcaoili</Text>
        <table>
          <tr>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Description</th>
            <th>Property No</th>
            <th>Date Acquired</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Unit</td>
            <td>Desktop Computer D15 Black</td>
            <td>2023-05-03-0003-10</td>
            <td>2023-08-14</td>
            <td>55000</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default GenerateICS;
