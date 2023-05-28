import React, { useEffect, useState } from "react";
import localApi from "../API/Api";
import Details2Modal from "./Details2Modal";
import Swal from "sweetalert2";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  InputLeftAddon,
  InputGroup,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

const EditModal = ({ isOpen, onClose, itemId }) => {
  const [data, setData] = useState([]);
  const [article, setArticle] = useState("");
  const [articleOther, setArticleOther] = useState("");
  const [type, setType] = useState("");
  const [typeOther, setTypeOther] = useState("");
  const [descOrig, setDescOrig] = useState("");
  const [desc, setDesc] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [details, setDetails] = useState("");
  const [other, setOther] = useState("");
  const [brand, setBrand] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [origin, setOrigin] = useState("");
  const [serialNum, setSerialNum] = useState("");
  const [warranty, setWarranty] = useState("");
  const [acquisition, setAcquisition] = useState("");
  const [propertyNum, setPropertyNum] = useState("");
  const [unit, setUnit] = useState("");
  const [location, setLocation] = useState("");
  const [donor, setDonor] = useState("");
  const [donorOther, setDonorOther] = useState("");
  const [remarkss, setRemarkss] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [accessories, setAccessories] = useState("");
  const [acquiMode, setAcquiMode] = useState("");
  const [expiration, setExpiration] = useState("");
  const [remarks, setRemarks] = useState("");

  console.log(article)


  //Fields
  const [getArticle, setGetArticle] = useState([]);
  const [getTypes, setGetTypes] = useState([]);
  const [getStatus, setGetStatus] = useState([]);
  const [getSupplier, setGetSupplier] = useState([]);
  const [itemStatus, setItemStatus] = useState("");
  const [itemStatusOther, setItemStatusOther] = useState("");

  const fetchData = async () => {
    let responseArticle = await localApi.get("article");
    setGetArticle(responseArticle.data);

    let responseTypes = await localApi.get("types", {
      params: { article: article },
    });
    setGetTypes(responseTypes.data);

    let responseStatus = await localApi.get("status");
    setGetStatus(responseStatus.data);

    let responseSupplier = await localApi.get("supplier", {
      params: { acquiMode: acquiMode },
    });
    setGetSupplier(responseSupplier.data);
  };

  useEffect(() => {
    fetchData();
    // fetchEdit();
  }, [type, article, acquiMode, itemId]);

  const clearForm = () => {
    setArticle("");
    setArticleOther("");
    setType("");
    setTypeOther("");
    setDescOrig("");
    setModel("");
    setVariant("");
    setDetails("");
    setOther("");
    setBrand("");
    setManufacturer("");
    setOrigin("");
    setSerialNum("");
    setWarranty("");
    setAcquisition("");
    setPropertyNum("");
    setUnit("");
    setLocation("");
    setDonor("");
    setRemarkss("");
    setCost("");
    setExpiration("");
    setAccessories("");
    setItemStatus("");
    setItemStatusOther("");
    setAcquiMode("");
    setCategory("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        localApi
          .post("save-item", {
            itemId: itemId,
            brand: brand,
            article: article === "Other" ? articleOther : article,
            type: type === "Other" ? typeOther : type,
            otherType: type,
            category: category,
            model: model,
            variant: variant,
            manufacturer: manufacturer,
            countries: origin,
            warranty: warranty,
            acquisition: acquisition,
            unit: unit,
            acquiMode: acquiMode,
            supplier: donor === "Other" ? donorOther : donor || null,
            cost: cost,
            expiration: expiration,
            details: details,
            remarks: remarks,
            accessories: accessories,
            other: other
          })
          .then(function (response) {
            if (response.data.status === 1) {
              clearForm();
              Swal.fire("Saved!", "", "success");
            }
          });
      }
    });
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid columns={6} columnGap={4} rowGap={6} p={3} mt={7}>
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Select
                      placeholder=" -- Select Category -- "
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Machinery</option>
                      <option>Office Equipment</option>
                      <option>Janitorial Equipment</option>
                      <option>Information and Communication Technology Equipment</option>
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

                <GridItem colSpan={6}>
                  <FormControl isRequired>
                    <FormLabel>Item Description</FormLabel>
                    <Textarea
                      isReadOnly
                      background="#eee"
                      disabled
                    // value={desc}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Article</FormLabel>
                    <Select
                      placeholder="- Select Article -"
                      value={article}
                      onChange={(e) => setArticle(e.target.value)}
                    >
                      {getArticle.map((item, index) => {
                        return (
                          <option value={item.article_name} key={index}>
                            {item.article_name}
                          </option>
                        );
                      })}
                      <option value="Other">Other</option>
                    </Select>
                    {article === "Other" && (
                      <Input
                        value={articleOther}
                        onChange={(e) => setArticleOther(e.target.value)}
                        marginTop={4}
                        variant="filled"
                        placeholder="If other, please specify"
                      />
                    )}
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Type/Form</FormLabel>
                    <Select
                      name="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      placeholder="- Select Type/Form -"
                    >
                      {getTypes.map((item, index) => {
                        return (
                          <option value={item.type_name} key={index}>
                            {item.type_name}
                          </option>
                        );
                      })}
                      <option value="Other">Other</option>
                    </Select>

                    {type === "Other" && (
                      <Input
                        value={typeOther}
                        onChange={(e) => setTypeOther(e.target.value)}
                        marginTop={4}
                        variant="filled"
                        placeholder="If other, please specify"
                      />
                    )}
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Model</FormLabel>
                    <Input
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]} key={data.id}>
                  <FormControl>
                    <FormLabel>Variety/Color</FormLabel>
                    <Textarea
                      value={variant}
                      onChange={(e) => setVariant(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Details2</FormLabel>
                    <Textarea
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Accessories</FormLabel>
                    <Textarea
                      value={accessories}
                      onChange={(e) => setAccessories(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Status</FormLabel>

                    <Select
                      value={itemStatus}
                      onChange={(e) => {
                        setItemStatus(e.target.value);
                      }}
                      placeholder="- Select Status -"
                    >
                      {getStatus.map((item, index) => {
                        return (
                          <option value={item.status_name} key={index}>
                            {item.status_name}
                          </option>
                        );
                      })}
                      <option value="Other">Other</option>
                    </Select>
                    {itemStatus === "Other" && (
                      <Input
                        value={itemStatusOther}
                        onChange={(e) => setItemStatusOther(e.target.value)}
                        marginTop={4}
                        variant="filled"
                        placeholder="If other, please specify"
                      />
                    )}
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Other</FormLabel>
                    <Input
                      value={other}
                      onChange={(e) => setOther(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Brand</FormLabel>
                    <Input
                      name="brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Manufacturer</FormLabel>
                    <Input
                      value={manufacturer}
                      onChange={(e) => setManufacturer(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Country of Origin</FormLabel>
                    <Input
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Warranty</FormLabel>
                    <Input
                      value={warranty}
                      onChange={(e) => setWarranty(e.target.value)}
                      type="date"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Acquisition Date</FormLabel>
                    <Input
                      value={acquisition}
                      onChange={(e) => setAcquisition(e.target.value)}
                      type="date"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Unit</FormLabel>
                    <Input
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Acquisition Mode</FormLabel>
                    <Select
                      value={acquiMode}
                      onChange={(e) => setAcquiMode(e.target.value)}
                      placeholder="- Select Acquisition Mode -"
                    >
                      <option>Purchase</option>
                      <option>Donation</option>
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Supplier/Donor</FormLabel>
                    <Select
                      value={donor}
                      onChange={(e) => setDonor(e.target.value)}
                      placeholder="- Select Supplier/Donor -"
                    >
                      {getSupplier.map((item, index) => {
                        return (
                          <option value={item.supplier} key={index}>
                            {item.supplier}
                          </option>
                        );
                      })}
                      <option value="Other">Other</option>
                    </Select>
                    {donor === "Other" && (
                      <Input
                        value={donorOther}
                        onChange={(e) => setDonorOther(e.target.value)}
                        marginTop={4}
                        variant="filled"
                        placeholder="If other, please specify"
                      />
                    )}
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Cost</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children="₱" />
                      <Input
                        type="number"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        placeholder="Pesos (php)"
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={[6, 6, 2, 2]}>
                  <FormControl>
                    <FormLabel>Expiration</FormLabel>
                    <Input
                      value={expiration}
                      onChange={(e) => {
                        setExpiration(e.target.value);
                      }}
                      type="date"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={6}>
                  <FormControl>
                    <FormLabel>Remarks</FormLabel>
                    <Textarea
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />
                  </FormControl>
                </GridItem>
              </SimpleGrid>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                bg="blue.300"
                color="white"
                _hover={{ bg: "blue.400" }}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default EditModal;