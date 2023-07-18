import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/Context";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";

const AttachEquipment = ({ isOpen, onClose }) => {
  const {
    peripMode,
    peripArticle,
    setPeripArticle,
    setPeripMode,
    formDataArray,
    setFormDataArray,
    newProp,
    getSupplier,
    getArticle,
    peripTypes,
  } = useContext(DataContext);

  const [peripCategory, setPeripCategory] = useState("");
  const [peripBarcode, setPeripBarcode] = useState("");
  const [peripDesc, setPeripDesc] = useState("");
  const [peripType, setPeripType] = useState("");
  const [peripVariety, setPeripVariety] = useState("");
  const [peripBrand, setPeripBrand] = useState("");
  const [peripDetails, setPeripDetails] = useState("");
  const [peripWarranty, setPeripWarranty] = useState("");
  const [peripAcquiDate, setPeripAcquiDate] = useState("");
  const [peripUnit, setPeripUnit] = useState("");
  // const [peripMode, setPeripMode] = useState("");
  const [peripSupplier, setPeripSupplier] = useState("");
  const [peripSerial, setPeripSerial] = useState("");
  const [peripCost, setPeripCost] = useState("");
  const [newArticle, setNewArticle] = useState("");
  const [newType, setNewType] = useState("");

  useEffect(() => {
    setPeripDesc(
      (peripArticle === "Other" ? newArticle : peripArticle) +
        " " +
        (peripType === "Other" ? newType : peripType) +
        " " +
        peripVariety +
        " " +
        peripDetails
    );
  }, [
    peripArticle,
    peripType,
    peripVariety,
    peripDetails,
    newArticle,
    newType,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormData = {
      peripCategory,
      peripBarcode,
      peripDesc,
      peripArticle,
      peripType,
      peripVariety,
      peripBrand,
      peripDetails,
      peripWarranty,
      peripAcquiDate,
      peripUnit,
      peripMode,
      peripSupplier,
      peripSerial,
      peripCost,
      newArticle,
      newType,
      newProp,
    };
  
    // Add a letter for each newProp
    const updatedFormDataArray = [...formDataArray, newFormData];
    const newLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Add more letters if needed
    const updatedFormDataArrayWithLetters = updatedFormDataArray.map(
      (data, index) => ({
        ...data,
        newProp: newProp + "-" + newLetters.charAt(index),
      })
    );
  
    // Add an ID for each item
    const updatedFormDataArrayWithId = updatedFormDataArrayWithLetters.map(
      (data, index) => ({
        ...data,
        id: index + 1, // Assuming the ID starts from 1
      })
    );
  
    localStorage.setItem(
      "peripherals",
      JSON.stringify(updatedFormDataArrayWithId)
    );
    setFormDataArray(updatedFormDataArrayWithId);
    setPeripArticle("");
    setPeripType("");
    setPeripVariety("");
    setPeripBrand("");
    setPeripDetails("");
    setPeripSerial("");
    setNewArticle("");
    setNewType("");
    setPeripCategory("");
    setPeripBarcode("");
    setPeripWarranty("");
    setPeripAcquiDate("");
    setPeripUnit("");
    setPeripMode("");
    setPeripSupplier("");
    setPeripCost("");
    onClose();
  };  

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <SimpleGrid columns={6} columnGap={2} rowGap={6} p={4}>
                <GridItem colSpan={3}>
                  <FormControl>
                    <FormLabel>Item Category</FormLabel>
                    <Select
                      placeholder=" -- Select Category -- "
                      value={peripCategory}
                      onChange={(e) => setPeripCategory(e.target.value)}
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

                <GridItem colSpan={3}>
                  <FormControl>
                    <FormLabel>Barcode</FormLabel>
                    <Input
                      value={peripBarcode}
                      onChange={(e) => setPeripBarcode(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                  <FormControl>
                    <FormLabel>Item Description</FormLabel>
                    <Textarea isDisabled={true} value={peripDesc}></Textarea>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Article</FormLabel>
                    <Select
                      placeholder="- Select Article -"
                      value={peripArticle}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        setPeripArticle(selectedValue);
                        if (selectedValue === "") {
                          setPeripType("");
                        }
                      }}
                    >
                      {getArticle.map((data) => {
                        return <option>{data.article_name}</option>;
                      })}
                      <option value="Other">Other</option>
                    </Select>
                    {peripArticle === "Other" && (
                      <Input
                        marginTop={4}
                        variant={"filled"}
                        value={newArticle}
                        onChange={(e) => setNewArticle(e.target.value)}
                      />
                    )}
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Type/Form</FormLabel>
                    <Select
                      placeholder="- Select Type -"
                      value={peripType}
                      onChange={(e) => setPeripType(e.target.value)}
                    >
                      {peripTypes.map((data) => {
                        if (peripArticle !== "") {
                          return <option>{data.type_name}</option>;
                        }
                      })}
                      <option value="Other">Other</option>
                    </Select>
                    {peripType === "Other" && (
                      <Input
                        marginTop={4}
                        variant={"filled"}
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                      />
                    )}
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Variety/Color</FormLabel>
                    <Input
                      value={peripVariety}
                      onChange={(e) => setPeripVariety(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Brand</FormLabel>
                    <Input
                      value={peripBrand}
                      onChange={(e) => setPeripBrand(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Details</FormLabel>
                    <Input
                      value={peripDetails}
                      onChange={(e) => setPeripDetails(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Warranty</FormLabel>
                    <Select
                      placeholder="Add Warranty"
                      value={peripWarranty}
                      onChange={(e) => setPeripWarranty(e.target.value)}
                    >
                      <option>5 months</option>
                      <option>6 months</option>
                      <option>7 months</option>
                      <option>1 year</option>
                      <option>2 years</option>
                      <option>3 years</option>
                      <option>4 years</option>
                      <option>5 years</option>
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Acquisition Date</FormLabel>
                    <Input
                      type="date"
                      value={peripAcquiDate}
                      onChange={(e) => setPeripAcquiDate(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Unit Name</FormLabel>
                    <Input
                      value={peripUnit}
                      onChange={(e) => setPeripUnit(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Acquisition Mode</FormLabel>
                    <Select
                      placeholder="- Select Acquisition -"
                      value={peripMode}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        setPeripMode(selectedValue);
                        if (selectedValue === "") {
                          setPeripSupplier("");
                        }
                      }}
                    >
                      <option>Regular</option>
                      <option>Donation</option>
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Supplier/Donor</FormLabel>
                    <Select
                      placeholder="- Select Supplier/Donor -"
                      value={peripSupplier}
                      onChange={(e) => setPeripSupplier(e.target.value)}
                    >
                      {getSupplier.map((data) => {
                        if (peripMode !== "") {
                          return <option>{data.supplier}</option>;
                        }
                      })}
                      <option>Other</option>
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Serial</FormLabel>
                    <Input
                      value={peripSerial}
                      onChange={(e) => setPeripSerial(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Cost</FormLabel>
                    <Input
                      type="number"
                      value={peripCost}
                      onChange={(e) => setPeripCost(e.target.value)}
                    />
                  </FormControl>
                </GridItem>
              </SimpleGrid>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AttachEquipment;
