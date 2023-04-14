import React, { useState, useEffect } from "react";
import localApi from "../../API/Api";
import Select from "react-select";
import zcmc from "../../Assets/zcmc_logo.png";

import {
  Button,
  SimpleGrid,
  GridItem,
  Container,
  Text,
} from "@chakra-ui/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Report.css";

const PropertyTag = () => {
  const [selectLoc, setSelectLoc] = useState("");
  const [location, setLocation] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let responseLocation = await localApi.get("locations");
    setLocation(responseLocation.data);

    let responseId = await localApi.get("tags", {
      params: { location: selectLoc },
    });
    setData(responseId.data);
  };

  useEffect(() => {
    fetchData();
  }, [selectLoc]);

  const download_pdf = () => {
    html2canvas(document.getElementById("generate"), { scale: 1 }).then(
      (canvas) => {
        const image = { type: "png", quality: 5 };
        const margin = [0.2, 0.2];

        var imgWidth = 13;
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
        // pdf.save();
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

      <div id="generate" className="tag-container">
        {data.map((item) => {
          return (
            <div className="tag">
              <div className="tag-head">
                <Text>ZAMBOANGA CITY MEDICAL CENTER</Text>
                <Text letterSpacing={3}>PROPERTY TAG</Text>
              </div>

              <div className="tag-content">
                <SimpleGrid columns={3}>
                  <GridItem colSpan={3} mt={5} display="flex">
                    <Text mr={20}>EQUIPMENT: </Text>
                    <Text
                      fontWeight={600}
                      borderBottom="1px solid black"
                      paddingBottom={2}
                      w={"62%"}
                    >
                      {item.desc}
                    </Text>
                  </GridItem>

                  <GridItem colSpan={3} mt={2} display="flex">
                    <Text mr={"60px"}>PROPERTY NO: </Text>
                    <Text
                      fontWeight={600}
                      borderBottom="1px solid black"
                      w="62%"
                      paddingBottom={2}
                    >
                      {item.property_no}
                    </Text>
                  </GridItem>

                  <GridItem colSpan={3} mt={2} display="flex">
                    <Text mr={"87px"}>SERIAL NO: </Text>
                    <Text
                      fontWeight={600}
                      borderBottom="1px solid black"
                      w="62%"
                      paddingBottom={2}
                    >
                      {item.serial}
                    </Text>
                  </GridItem>

                  <GridItem colSpan={3} mt={2} display="flex">
                    <Text mr={"39px"}>CLASSIFICATION: </Text>
                    <Text
                      fontWeight={600}
                      borderBottom="1px solid black"
                      w="62%"
                      paddingBottom={2}
                    >
                      {item.itemCateg_name}
                    </Text>
                  </GridItem>

                  <GridItem colSpan={3} mt={2} display="flex">
                    <Text mr={"40px"}>DATE ACQUIRED: </Text>
                    <Text
                      fontWeight={600}
                      borderBottom="1px solid black"
                      w="62%"
                      paddingBottom={2}
                    >
                      {item.Delivery_date}
                    </Text>
                  </GridItem>

                  <GridItem colSpan={3} mt={2} display="flex">
                    <Text mr={"17px"}>SECTION ASSIGNED: </Text>
                    <Text
                      fontWeight={600}
                      borderBottom="1px solid black"
                      w="62%"
                      paddingBottom={2}
                    >
                      {item.location_name}
                    </Text>
                  </GridItem>

                  <GridItem colSpan={3} mt={2} display="flex">
                    <Text mr={"97px"}>AMOUNT: </Text>
                    <Text
                      fontWeight={600}
                      borderBottom="1px solid black"
                      w="62%"
                      paddingBottom={2}
                    >
                      {item.costs}
                    </Text>
                  </GridItem>
                </SimpleGrid>
                <div>
                  <img src={zcmc} className="tag-image" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyTag;
