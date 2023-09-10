import React, { useState, useEffect } from "react";
import localApi from "../../API/Api";
import zcmc from "../../Assets/zcmc_logo.png";
import doh from "../../Assets/doh.png";
import {
  Button,
  SimpleGrid,
  GridItem,
  Center,
  Text,
  Flex,
} from "@chakra-ui/react";
import Select from "react-select";

function GeneratePAR() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedPAR, setSelectedPAR] = useState("");
  const [par, setPar] = useState([]);
  const [data, setData] = useState([]);

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
              isdisabled={isDownloading}
              onClick={handlePrint}
            >
              {isDownloading ? "Printing..." : "Print"}
            </Button>
          </GridItem>
        </SimpleGrid>
      </div>

      <div className="par-table">
        <div className="table_header">
          <div className="header-container">
            <img src={zcmc} width={50} class="logo-left"/>
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
              <Text fontWeight={'light'} fontSize={12} className="head">
                Dr. D. Evangelista St., Sta. Catalina, Zamboanga City, 7000								
              </Text>
            </div>
            <img src={doh} width={50} class="logo-right"/>
          </div>

          <Text
            fontSize={15}
            mt={10}
            mb={10}
            fontWeight={"bold"}
            className="type"
          >
            PROPERTY AKNOWLEDGEMENT RECEIPT
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
                PAR No.:
              </Text>
              <Text fontSize={13} fontFamily={"Arial"}>
                {selectedPAR}
              </Text>
            </Flex>
          </Flex>
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

            {data.map((data) => {
              return (
                <tr>
                  <td>{data.qty}</td>
                  <td>{data.unit}</td>
                  <td>{data.desc}</td>
                  <td>{data.newProperty}</td>
                  <td>{data.acquisition_date}</td>
                  <td>{data.costs}</td>
                </tr>
              );
            })}
            <tr style={{ height: "20px" }}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td></td>
              <td>
                <Text textAlign={"right"} className="note">
                  NOTE:
                </Text>
              </td>
              {data.map((data) => {
                return (
                  <td style={{ textAlign: "left", lineHeight: "1" }}>
                    <Text className="note">{data.fundSource}</Text>
                    <Text className="note">Invoice #: {data.invoice}</Text>
                    <Text className="note">PO #: {data.po_number}</Text>
                    <Text className="note">ORS #: {data.ors_num}</Text>
                    <Text className="note">
                      PO Conformed: {data.po_conformed}
                    </Text>
                    <Text className="note">IAR No.: {data.iar}</Text>
                  </td>
                );
              })}
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td colspan="3">
                <Text
                  textAlign={"left"}
                  fontWeight={"bold"}
                  fontStyle={"italic"}
                  className="note"
                >
                  Received by:
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

              <td colspan="3">
                <Text
                  textAlign={"left"}
                  fontWeight={"bold"}
                  fontStyle={"italic"}
                  className="note"
                >
                  Issued by:
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
        </Center>
        <Text fontSize={10} fontFamily={"Arial"} fontStyle={"italic"}>
          (Adopted from Goverment Accounting Manual : Appendix 71)
        </Text>
      </div>
    </div>
  );
}

export default GeneratePAR;
