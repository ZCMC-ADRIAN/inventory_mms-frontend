import React, { useState, useEffect } from "react";
import localApi from "../../API/Api";
import zcmc from "../../Assets/zcmc_logo.png";
import doh from "../../Assets/doh.png";
import {
  Button,
  SimpleGrid,
  GridItem,
  theme,
  color,
  Text,
  Flex
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
      params: { ics: selectedICS },
    });
    setData(responseGenerate.data);
  };

  useEffect(() => {
    fetchData();
  }, [selectedICS]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="search">
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
              onClick={handlePrint}
              isdisabled={isDownloading}
            >
              {isDownloading ? "Printing..." : "Print"}
            </Button>
          </GridItem>
        </SimpleGrid>
      </div>

      <div className="par-table">
        <div className="table_header">
          <div className="header-container">
            <img src={zcmc} width={50} class="logo-left" />
            <div className="text-container">
              <Text fontSize={12} className="head">
                Republic of the Philippines
              </Text>
              <Text fontSize={12} className="head">
                Department of Health
              </Text>
              <Text fontSize={12} fontWeight="bold" className="head">
                ZAMBOANGA CITY MEDICAL CENTER
              </Text>
              <Text fontWeight={"light"} fontSize={12} className="head">
                Dr. D. Evangelista St., Sta. Catalina, Zamboanga City, 7000
              </Text>
            </div>
            <img src={doh} width={50} class="logo-right" />
          </div>

          <Text
            fontSize={15}
            mt={10}
            mb={10}
            fontWeight={"bold"}
            className="type"
          >
            INVENTORY CUSTODIAN SLIP
          </Text>
        </div>

        <div>
          <Flex>
            <Text fontSize={13} mr={4} fontFamily={"Arial"}>
              Entity Name:
            </Text>
            <Text
              fontSize={13}
              fontWeight={"bold"}
              textDecoration="underline"
              fontFamily={"Arial"}
            >
              ZAMBOANGA CITY MEDICAL CENTER
            </Text>
          </Flex>

          <Flex>
            <Text fontSize={13} mr={4} fontFamily={"Arial"}>
              Fund Cluster:
            </Text>
            {data.map((fund) => {
              return (
                <Text
                  fontSize={13}
                  textDecoration="underline"
                  fontFamily={"Arial"}
                >
                  {fund.fundCluster}
                </Text>
              );
            })}

            <Flex position={"absolute"} ml={"70%"}>
              <Text fontSize={13} mr={4} fontFamily={"Arial"}>
                ICS No.:
              </Text>
              <Text fontSize={13} fontFamily={"Arial"}>
                {selectedICS}
              </Text>
            </Flex>
          </Flex>
        </div>

        <table>
          <tr>
            <th rowSpan={2} className="th-qty">
              Quantity
            </th>
            <th rowSpan={2}>Unit</th>
            <th colSpan={2}>Amount</th>
            <th rowSpan={2}>Description</th>
            <th rowSpan={2} className="th-tag">
              Inventory Item No.
            </th>
            <th rowSpan={2} className="th-estimate">
              Estimated Useful Life
            </th>
          </tr>
          <tr>
            <th className="th-desc">Unit Cost</th>
            <th className="th-desc">Total Cost</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Unit</td>
            <td>1000</td>
            <td>1000</td>
            <td>Desktop Computer D15 Black</td>
            <td>55000</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ textAlign: "right" }}>Note:</td>
            <td style={{ textAlign: "left", fontSize: "10px" }}>
              <Text className="note">RC Lim Marketing</Text>
              <Text className="note">PO# 23060244 DTD: 06//29/2023</Text>
              <Text className="note">INVOICE# 18659 DTD: 07/10/2023</Text>
              <Text className="note">ORS/BURS: 02-206443-2023-07-000699</Text>
            </td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td colSpan={4}>
              <Text
                textAlign={"left"}
                fontWeight={"bold"}
                fontStyle={"italic"}
                className="note"
              >
                Received from:
              </Text>

              {data.map((data) => {
                return (
                  <Text
                    textTransform={"uppercase"}
                    fontWeight={"bold"}
                    textDecoration={"underline"}
                    mt={5}
                    fontFamily={"Times New Roman"}
                  >
                    {data.person_name}
                  </Text>
                );
              })}
              <Text fontSize={10} fontFamily={"Arial"}>
                Signature over Printed Name
              </Text>

              {data.map((data) => {
                return (
                  <Text mt={5} fontFamily={"Arial"}>
                    {data.location_name}
                  </Text>
                );
              })}

              <Text fontFamily={"Arial"}>Position/Office</Text>

              <Text mt={10} textDecoration={"underline"} fontFamily={"Arial"}>
                09/10/2023
              </Text>
              <Text fontFamily={"Arial"}>Date</Text>
            </td>

            <td colSpan={3}>
              <Text
                textAlign={"left"}
                fontWeight={"bold"}
                fontStyle={"italic"}
                className="note"
              >
                Received by:
              </Text>
              <Text
                textTransform={"uppercase"}
                fontWeight={"bold"}
                textDecoration={"underline"}
                mt={5}
                fontFamily={"Times New Roman"}
              >
                JOHN MARY C. STA. TERESA
              </Text>
              <Text fontSize={10} fontFamily={"Arial"}>
                Signature over Printed Name
              </Text>

              <Text mt={5} fontFamily={"Arial"}>
                OIC - MMS
              </Text>
              <Text fontFamily={"Arial"}>Position/Office</Text>

              <Text mt={10} textDecoration={"underline"} fontFamily={"Arial"}>
                09/10/2023
              </Text>
              <Text fontFamily={"Arial"}>Date</Text>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default GenerateICS;
