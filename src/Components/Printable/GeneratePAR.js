import React, { useState, useEffect } from "react";
import localApi from "../../API/Api";
import {
  Button,
  SimpleGrid,
  GridItem,
  Center,
  Text,
} from "@chakra-ui/react";
import Select from "react-select";

function GeneratePAR() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedPAR, setSelectedPAR] = useState("");
  const [par, setPar] = useState([]);
  const [data, setData] = useState([]);

  // console.log(data)

  const fetchData = async () => {
    let responsePAR = await localApi.get("par");
    setPar(responsePAR.data);

    const responseGenerate = await localApi.get("generate/par", {
      params: { par: selectedPAR },
    });
    setData(responseGenerate.data);
  };

  useEffect(() => {
    fetchData();
  }, [selectedPAR]);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      const responseGenerate = await localApi.get("generate/par", {
        params: { par: selectedPAR },
        responseType: "blob",
      });
      setData(responseGenerate.data);

      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([responseGenerate.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "PAR.docx"; // Set the desired filename
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
            options={par.map((det) => {
              return { value: det.par_number, label: det.par_number };
            })}
            onChange={(e) => setSelectedPAR(e.label, e.value)}
            placeholder="Select PAR"
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
        <div className="table_header">
          <Text fontSize={12} mb={2}>
            Republic of the Philippines
          </Text>
          <Text fontSize={12} mb={2}>
            Department of Health
          </Text>
          <Text fontSize={12} mb={2} fontWeight='bold'>
            ZAMBOANGA CITY MEDICAL CENTER
          </Text>
        </div>

        <Center>
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
        </Center>
        
      </div>
    </div>
  );
}

export default GeneratePAR;
