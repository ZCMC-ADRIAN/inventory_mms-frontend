import React, { useState, useEffect, useRef } from "react";
import QrScan from "react-qr-reader";
import localApi from "../API/Api";
import {
  Center,
  Text,
  Container,
  SimpleGrid,
  GridItem,
  Flex,
} from "@chakra-ui/react";

function QRscanner() {
  const [qrscan, setQrscan] = useState("No result");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let responseData = await localApi.get("qr-data", {
      params: { inventoryId: qrscan },
    });
    setData(responseData.data);
  };

  useEffect(() => {
    fetchData();
  }, [qrscan]);

  const handleScan = (data) => {
    if (data) {
      setQrscan(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <Text textAlign="center">QR Scanner</Text>
      <Center>
        <div style={{ marginTop: 30 }}>
          <QrScan
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ height: 240, width: 320 }}
          />
        </div>
      </Center>
      <Container mt={100} bg="#fff" p={3}>
        {data.map((list) => {
          return (
            <SimpleGrid columns={2}>
              <GridItem colSpan={2}>
                <Flex>
                  <Text fontSize={"17px"} color="#2583CF" mr={3}>
                    Equipment:{" "}
                  </Text>
                  <Text>{list.desc}</Text>
                </Flex>
                <Flex>
                  <Text fontSize={"17px"} color="#2583CF" mr={3}>
                    Property No:{" "}
                  </Text>
                  <Text>{list.property_no}</Text>
                </Flex>
                <Flex>
                  <Text fontSize={"17px"} color="#2583CF" mr={3}>
                    Serial No:{" "}
                  </Text>
                  <Text>{list.serial}</Text>
                </Flex>
                <Flex>
                  <Text fontSize={"17px"} color="#2583CF" mr={3}>
                    Classification:{" "}
                  </Text>
                  <Text>ICTE</Text>
                </Flex>
                <Flex>
                  <Text fontSize={"17px"} color="#2583CF" mr={3}>
                    Date Acquired:{" "}
                  </Text>
                  <Text>{list.Delivery_data}</Text>
                </Flex>
                <Flex>
                  <Text fontSize={"17px"} color="#2583CF" mr={3}>
                    Section Assgined:{" "}
                  </Text>
                  <Text>Eye Center</Text>
                </Flex>
              </GridItem>
            </SimpleGrid>
          );
        })}
      </Container>
    </div>
  );
}

export default QRscanner;
