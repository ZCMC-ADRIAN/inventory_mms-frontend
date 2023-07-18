import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Center,
  Input,
  Select,
  Textarea,
  FormControl,
  Button,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import DataContext from "../Context/Context";

const AttachPeripheral = ({id, setId}) => {
  const { showForm, setShowForm, getArticle, getTypes, getSupplier, addType, setAddType, addArticle, setAddArticle , addTypes} = useContext(DataContext);

  const [addCategory, setAddDCategory] = useState("");
  const [addBarcode, setAddBarCode] = useState("");
  const [addDesc, setAddDesc] = useState("");
  const [addVariety, setAddVariety] = useState("");
  const [addBrand, setAddBrand] = useState("");
  const [addDetails, setAddDetails] = useState("");
  const [addUnit, setAddUnit] = useState("");
  const [addSerial, setAddSerial] = useState("");
  const [addCost, setAddCost] = useState("");

  const handleShow = () => {
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const peripherals = JSON.parse(localStorage.getItem('peripheralsData')) || [];
  
    const newPeripheral = {
      id,
      addCategory,
      addBarcode,
      addDesc,
      addArticle,
      addType,
      addVariety,
      addBrand,
      addDetails,
      addUnit,
      addSerial,
      addCost
    };
  
    if (addCategory !== '' || addArticle !== '' || addType !== '') {
      peripherals.push(newPeripheral);
      localStorage.setItem('peripheralsData', JSON.stringify(peripherals));
    }
  
    setAddDCategory("")
    setAddBarCode("");
    setAddDesc("");
    setAddArticle("");
    setAddType("");
    setAddVariety("");
    setAddBrand("");
    setAddDetails("");
    setAddUnit("");
    setAddSerial("");
    setAddCost("");
  }
  

  return (
    <div>
      {showForm && (
        <Container
          borderRadius={5}
          mt={10}
          boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 3px 4px;"
        >
          <form>
            <SimpleGrid columns={4} columnGap={3} rowGap={6} p={4}>
              <GridItem colSpan={2}>
                <FormControl>
                  <Select
                    placeholder=" - Select Category - "
                    variant={"flushed"}
                    borderColor={"gray.500"}
                    fontSize={14}
                    value={addCategory}
                    onChange={(e) => setAddDCategory(e.target.value)}
                  >
                    <option>Machinery</option>
                    <option>Office Equipment</option>
                    <option>Janitorial Equipment</option>
                    <option>
                      Information and Communication Technology Equipment
                    </option>
                    <option>Agricultural and Forestry</option>
                    <option>Disaster Response and Rescue Equipment</option>
                    <option>Military Police and Security</option>
                    <option>Medical Equipment</option>
                    <option>Printing Equipment</option>
                    <option>Sports Equipment</option>
                    <option>Technincal and Scientific Equipment</option>
                    <option>Other Machinery and Equipment</option>
                    <option>Furnitures and Fixtures</option>
                    <option>Books</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl>
                  <Input
                    placeholder="Barcode"
                    variant={"flushed"}
                    borderColor={"gray.500"}
                    value={addBarcode}
                    onChange={(e) => setAddBarCode(e.target.value)}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={4}>
                <FormControl>
                  <Textarea isDisabled={true} variant={"flushed"} value={addDesc} onChange={(e) => setAddDesc(e.target.value)}></Textarea>
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl>
                  <Select
                    placeholder="- Select Article -"
                    variant={"flushed"}
                    borderColor={"gray.500"}
                    value={addArticle}
                    onChange={(e) => setAddArticle(e.target.value)}
                  >
                    {getArticle.map((data) => {
                      return (
                        <option>{data.article_name}</option>
                      )
                    })}
                    <option>Other</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl>
                  <Select
                    placeholder="- Select Type -"
                    variant={"flushed"}
                    borderColor={"gray.500"}
                    value={addType}
                    onChange={(e) => setAddType(e.target.value)}
                  >
                    {addTypes.map((data) => {
                      return (
                        <option>{data.type_name}</option>
                      )
                    })}
                    <option value="Other">Other</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl>
                  <Input
                    placeholder="Variety/Color"
                    variant={"flushed"}
                    borderColor={"gray.500"}
                    value={addVariety}
                    onChange={(e) => setAddVariety(e.target.value)}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl>
                  <Input
                    placeholder="Brand"
                    variant={"flushed"}
                    borderColor={"gray.500"}
                    value={addBrand}
                    onChange={(e) => setAddBrand(e.target.value)}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl>
                  <Input
                    placeholder="Details"
                    variant={"flushed"}
                    borderColor={"gray.500"}
                    value={addDetails}
                    onChange={(e) => setAddDetails(e.target.value)}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl>
                  <Input
                    placeholder="Unit Name"
                    variant={"flushed"}
                    borderColor={"gray.500"}
                    value={addUnit}
                    onChange={(e) => setAddUnit(e.target.value)}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl>
                  <Input
                    placeholder="Serial"
                    variant={"flushed"}
                    borderColor={"gray.500"}
                    value={addSerial}
                    onChange={(e) => setAddSerial(e.target.value)}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Cost"
                    variant={"flushed"}
                    borderColor={"gray.500"}
                    value={addCost}
                    onChange={(e) => setAddCost(e.target.value)}
                  />
                </FormControl>
              </GridItem>

              <GridItem
                display="flex"
                columnGap={2}
                colSpan={4}
                marginTop={10}
                justifyContent={{
                  base: "flex-end",
                  md: "flex-end",
                  sm: "center",
                }}
              >
                <Button onClick={() => {handleShow(); setId()}}>Cancel</Button>

                <Button colorScheme="teal" color={"white"} onClick={handleSubmit}>
                  Add
                </Button>
              </GridItem>
            </SimpleGrid>
          </form>
        </Container>
      )}
    </div>
  );
};

export default AttachPeripheral;
