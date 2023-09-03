import React, { useState } from "react";
import localApi from "../../API/Api";
import { Button, SimpleGrid, GridItem, theme, color } from "@chakra-ui/react";
import Select from "react-select";

function App() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      const response = await localApi.get("test", {
        responseType: "blob", // Set the response type to blob
      });

      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "Report.docx"; // Set the desired filename
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
      {/* <Button onClick={handleDownload} disabled={isDownloading}>
        {isDownloading ? 'Downloading...' : 'Download DOCX'}
      </Button> */}
      <SimpleGrid columns={6} columnGap={3} p={10}>
        <GridItem colSpan={1}>
          <Select
            class="select"
            // options={location.map((det) => {
            //   return { value: det.location_name, label: det.location_name };
            // })}
            // onChange={(e) => setSelectLoc(e.label, e.value)}
            placeholder="Select PAR"
          />
        </GridItem>
        <GridItem colSpan={1}>
          <Button
            bg="#91C788"
            color="#fff"
            _hover={{ bg: "#74b369" }}
            disabled={isDownloading}
            onClick={handleDownload} isdisabled={isDownloading}
          >
            {isDownloading ? 'Generating...' : 'Generate'}
          </Button>
        </GridItem>
      </SimpleGrid>
    </div>
  );
}

export default App;
