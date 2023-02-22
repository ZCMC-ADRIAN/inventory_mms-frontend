import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  Select,
  Button,
  useToast,
  InputLeftAddon,
  InputGroup,
  Stack,
  Box,
} from "@chakra-ui/react";
import useAuth from "../../Hooks/useAuth";
import localApi from "../../API/Api";

const Equipment = ({ setTab }) => {
  const donors = [
    "doh",
    "department of health",
    "icrc",
    "international committee of the red cross",
    "biatf",
    "who",
    "world health organization",
  ];

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
  const [remarks, setRemarks] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState(0);
  const [accessories, setAccessories] = useState("");
  const [acquiMode, setAcquiMode] = useState("");
  const { user } = useAuth();

  //Utilities State
  const todate = new Date();
  const toast = useToast();
  const [isClick, setIsClick] = useState(false);

  //In state
  const [expiration, setExpiration] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [itemStatusOther, setItemStatusOther] = useState("");

  //Fields
  const [getArticle, setGetArticle] = useState([]);
  const [getTypes, setGetTypes] = useState([]);
  const [getStatus, setGetStatus] = useState([]);
  const [getSupplier, setGetSupplier] = useState([]);

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
  }, [type, article, acquiMode]);

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
    setRemarks("");
    setCost("");
    setExpiration("");
    setAccessories("");
    setItemStatus("");
    setItemStatusOther("");
    setAcquiMode("");
    setCategory("");
  };

  const { setAppState } = useAuth();

  useEffect(() => {
    setDesc(
      (article === "Other" ? articleOther : article) +
        " " +
        (type === "Other" ? typeOther : type) +
        " " +
        model +
        " " +
        variant +
        " " +
        details +
        " " +
        other
    );
  }, [article, articleOther, type, typeOther, model, variant, details, other]);

  const handleCreate = (e) => {
    e.preventDefault();
    setIsClick(true);
    localApi
      .post("create", {
        descOrig: descOrig,
        article: article === "Other" ? articleOther : article,
        type: type === "Other" ? typeOther : type,
        status: itemStatus === "Other" ? itemStatusOther : itemStatus,
        model: model,
        variant: variant,
        details: details,
        other: other,
        brand: brand,
        manufacturer: manufacturer,
        countries: origin,
        serialNum: serialNum,
        warranty: warranty,
        acquisition: acquisition,
        propertyNum: propertyNum,
        unit: unit,
        location: location,
        acquisitionMode: acquiMode,
        supplier: donor === "Other" ? donorOther : donor,
        remarks: remarks,
        expiration: expiration,
        cost: cost,
        category: category,
        accessories: accessories,
      })
      .then(function (response) {
        if (response.data.status === 1) {
          setIsClick(false);
          clearForm();
          setAppState("Item Created");
          setTimeout(() => setAppState(""), 500);
          toast({
            title: "Item Created",
            description: "Added one (1) item to the database",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <div>
      <Box
        boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
        bg="#fff"
        borderRadius={8}
        py={{ sm: "8" }}
        px={{ sm: "10" }}
      >
        <Stack spacing="3">
          <form onSubmit={handleCreate}>
            <Stack spacing="4">
              <Stack spacing="4">
                <FormControl isRequired w={{ lg: 400, md: 300, sm: 250 }}>
                  <FormLabel>Category</FormLabel>
                  <Select
                    placeholder=" -- Select Category -- "
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Medical Equipment</option>
                    <option>Janitorial Equipment</option>
                    <option>Office Equipment</option>
                    <option>Furniture</option>
                    <option>Appliances</option>
                    <option>Other</option>
                  </Select>
                </FormControl>

                <HStack
                  display={"flex"}
                  flexDirection={{ lg: "row", md: "row", sm: "column" }}
                >
                  <FormControl isRequired>
                    <FormLabel>Item Description (Original)</FormLabel>
                    <Textarea
                      value={descOrig}
                      onChange={(e) => setDescOrig(e.target.value)}
                      placeholder="Original Description"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Item Description</FormLabel>
                    <Textarea
                      isReadOnly
                      background="#eee"
                      disabled
                      value={desc}
                    />
                  </FormControl>
                </HStack>

                <HStack
                  display={"flex"}
                  flexDirection={{ lg: "row", md: "column", sm: "column" }}
                >
                  <FormControl>
                    <FormLabel>Article</FormLabel>
                    <Select
                      value={article}
                      onChange={(e) => {
                        setArticle(e.target.value);
                        setTypeOther("");
                        setType("");
                      }}
                      placeholder="- Select Article -"
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

                  <FormControl>
                    <FormLabel>Type/Form</FormLabel>
                    <Select
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

                  <FormControl>
                    <FormLabel>Model</FormLabel>
                    <Input
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Variety/Color</FormLabel>
                    <Input
                      value={variant}
                      onChange={(e) => setVariant(e.target.value)}
                    />
                  </FormControl>
                </HStack>

                <HStack
                  display={"flex"}
                  flexDirection={{ lg: "row", md: "column", sm: "column" }}
                >
                  <FormControl>
                    <FormLabel>Details2</FormLabel>
                    <Textarea
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Accessories</FormLabel>
                    <Textarea
                      value={accessories}
                      onChange={(e) => setAccessories(e.target.value)}
                    />
                  </FormControl>
                </HStack>

                <HStack
                  display={"flex"}
                  flexDirection={{ lg: "row", md: "column", sm: "column" }}
                >
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

                  <FormControl>
                    <FormLabel>Other</FormLabel>
                    <Input
                      value={other}
                      onChange={(e) => setOther(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Brand</FormLabel>
                    <Input
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Manufacturer</FormLabel>
                    <Input
                      value={manufacturer}
                      onChange={(e) => setManufacturer(e.target.value)}
                    />
                  </FormControl>
                </HStack>

                <HStack
                  display={"flex"}
                  flexDirection={{ lg: "row", md: "column", sm: "column" }}
                >
                  <FormControl>
                    <FormLabel>Country of Origin</FormLabel>
                    <Input
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </FormControl>

                  {/* <FormControl>
                    <FormLabel>Serial Number</FormLabel>
                    <Input
                      value={serialNum}
                      onChange={(e) => setSerialNum(e.target.value)}
                    />
                  </FormControl> */}

                  <FormControl>
                    <FormLabel>Warranty</FormLabel>
                    <Input
                      value={warranty}
                      onChange={(e) => setWarranty(e.target.value)}
                      type="date"
                    />
                  </FormControl>
                </HStack>

                <HStack
                  display={"flex"}
                  flexDirection={{ lg: "row", md: "column", sm: "column" }}
                >
                  <FormControl>
                    <FormLabel>Acquisition Date</FormLabel>
                    <Input
                      value={acquisition}
                      onChange={(e) => setAcquisition(e.target.value)}
                      type="date"
                    />
                  </FormControl>

                  {/* <FormControl>
                    <FormLabel>Property Number</FormLabel>
                    <Input
                      value={propertyNum}
                      onChange={(e) => setPropertyNum(e.target.value)}
                    />
                  </FormControl> */}

                  <FormControl>
                    <FormLabel>Unit</FormLabel>
                    <Input
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </FormControl>
                </HStack>

                <HStack
                  display={"flex"}
                  flexDirection={{ lg: "row", md: "column", sm: "column" }}
                >
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
                </HStack>

                <HStack
                  display={"flex"}
                  flexDirection={{ lg: "row", md: "column", sm: "column" }}
                >
                  <FormControl>
                    <FormLabel>Remarks</FormLabel>
                    <Textarea
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />
                  </FormControl>
                </HStack>

                <HStack
                  marginTop={5}
                  justifyContent={{
                    base: "flex-end",
                    md: "flex-end",
                    sm: "center",
                  }}
                >
                  <Button onClick={() => setTab("inItem")}>Cancel</Button>
                  <Button
                    color="#fff"
                    isLoading={isClick ? true : false}
                    colorScheme="teal"
                    loadingText="Creating Item"
                    type="submit"
                  >
                    Create Item
                  </Button>
                </HStack>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Box>
    </div>
  );
};

export default Equipment;
