import React, { useState, useEffect, useRef } from "react";
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
import jsPDF from "jspdf";
import "./Report.css";

const PDFGenerator = () => {
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
  const customHtmlRef = useRef(null); // Ref for custom HTML element

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const element = customHtmlRef.current;
    let tagClassCounter = 0; // Counter for the target tag class
    const options = {
      margin: [10, 10, 10, 10],
      html2canvas: {
        scale: 0.17
      },
      // Function to be executed before a new page is added
      beforeAddPage: function(page) {
        const targetClass = "tag"; // Replace with your target tag class
        const targetElements = page.querySelectorAll(`.${targetClass}`);
        if (targetElements.length > 4) {
          tagClassCounter = 0; // Reset the counter
          return true; // Add a new page
        }
      },
      callback: function (doc) {
        window.open(doc.output("bloburl"));
      },
    };
    doc.html(element, options);
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
            bg="#91C788"
            color="#fff"
            _hover={{ bg: "#74b369" }}
            onClick={generatePDF}
          >
            Generate
          </Button>
        </GridItem>
      </SimpleGrid>
      <div ref={customHtmlRef} id="custom-html">
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
                    <Text className="tag-label">EQUIPMENT: </Text>
                    <Text
                    className='tag-data'
                    >
                      {item.desc}
                    </Text>
                  </GridItem>

                  <GridItem colSpan={3} mt={2} display="flex">
                    <Text className="tag-label">PROPERTY NO: </Text>
                    <Text
                    className='tag-data'
                    >
                      {item.property_no}
                    </Text>
                  </GridItem>

                  <GridItem colSpan={3} mt={2} display="flex">
                    <Text className="tag-label">SERIAL NO: </Text>
                    <Text
                    className='tag-data'
                    >
                      {item.serial}
                    </Text>
                  </GridItem>

                  <GridItem colSpan={3} mt={2} display="flex">
                    <Text className="tag-label">CLASSIFICATION: </Text>
                    <Text
                    className='tag-data'
                    >
                      {item.itemCateg_name}
                    </Text>
                  </GridItem>

                  <GridItem colSpan={3} mt={2} display="flex">
                    <Text className="tag-label">DATE ACQUIRED: </Text>
                    <Text
                    className='tag-data'
                    >
                      {item.Delivery_date}
                    </Text>
                  </GridItem>

                  <GridItem colSpan={3} mt={2} display="flex">
                    <Text className="tag-label">SECTION ASSIGNED: </Text>
                    <Text
                    className='tag-data'
                    >
                      {item.location_name}
                    </Text>
                  </GridItem>

                  <GridItem colSpan={3} mt={2} display="flex">
                    <Text className="tag-label">AMOUNT: </Text>
                    <Text
                    className='tag-data'
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

export default PDFGenerator;
