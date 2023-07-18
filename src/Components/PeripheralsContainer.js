import React, { useContext, useState, useEffect } from "react";
import localApi from "../API/Api";
import {
  Container,
  Text,
  Button,
  Grid,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import DataContext from "../Context/Context";
import { HiTrash, HiPlus } from "react-icons/hi";

const PeripheralsContainer = ({ id, setId }) => {
  const [desiredData, setDesiredData] = useState([]);
  const [desiredId, setDesiredId] = useState();

  const { formDataArray, setFormDataArray, setShowForm } =
    useContext(DataContext);

  const handleDelete = (index) => {
    const updatedFormDataArray = [...formDataArray];
    updatedFormDataArray.splice(index, 1); // Remove the element at the specified index
    localStorage.setItem(
      "peripherals",
      JSON.stringify(updatedFormDataArray)
    );

    setFormDataArray(updatedFormDataArray); //Update the state
  };

  const handleShow = () => {
    setShowForm(true);
  };

  useEffect(() => {
    const data1String = localStorage.getItem("peripheralsData");
    const data2String = localStorage.getItem("peripherals");
  
    const data1 = data1String ? JSON.parse(data1String) : null; // Add a check for null value
    const data2 = data2String ? JSON.parse(data2String) : null; // Add a check for null value
  
    if (data1 && data2) {
      const desiredData = data2.reduce((acc, item) => {
        if (item.id === desiredId) {
          const foundData = data1.filter((data) => data.id === desiredId);
          return [...acc, ...foundData];
        }
        return acc;
      }, []);
  
      setDesiredData(desiredData);
    } else {
      setDesiredData([]);
    }
  }, [desiredId, localStorage.getItem("peripheralsData"), localStorage.getItem("peripherals")]);  

  return (
    <div>
      <Accordion allowToggle mt={2} size={"md"}>
        {formDataArray.map((data, index) => {
          return (
            <AccordionItem>
              <h2>
                <AccordionButton
                  bg={"blue.200"}
                  _hover={{ bg: "blue.300" }}
                  onClick={() => setDesiredId(data.id)}
                >
                  <Box as="span" flex="1" textAlign="left">
                    <Grid>
                      <Text
                        color={"black"}
                        fontWeight={"bold"}
                        fontSize={"14px"}
                      >
                        {data.peripDesc}
                      </Text>
                      <Text color={"black"} fontSize={"13px"}>
                        SERIAL: {data.peripSerial}
                      </Text>
                      <Text color={"black"} fontSize={"13px"}>
                        PROPERTY: {data.newProp}
                      </Text>
                      <Text color={"black"} fontSize={"13px"}>
                        BARCODE: {data.peripBarcode}
                      </Text>
                      <Text color={"black"} fontSize={"13px"}>
                        COST: {data.peripCost}
                      </Text>
                    </Grid>
                  </Box>

                  <Button
                    size={"sm"}
                    _hover={{
                      bg: "#FCAEAE",
                      boxShadow: "lg",
                      transform: "scale(1.1,1.1)",
                      transition: "0.3s",
                    }}
                    mr={2}
                    onClick={(e) => {
                      handleDelete(index);
                      e.stopPropagation();
                    }}
                  >
                    <HiTrash color={"red"} fontSize={"19px"} />
                  </Button>

                  <Button
                    size={"sm"}
                    _hover={{
                      bg: "#C7E8CA",
                      boxShadow: "lg",
                      transform: "scale(1.1,1.1)",
                      transition: "0.3s",
                    }}
                    onClick={(e) => {
                      {
                        handleShow();
                        e.stopPropagation();
                        setId(data.id);
                      }
                    }}
                  >
                    <HiPlus color={"#5D9C59"} fontSize={"19px"} />
                  </Button>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {desiredData.map((data) => {
                  return <Text>{data.addArticle}</Text>;
                })}
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default PeripheralsContainer;
