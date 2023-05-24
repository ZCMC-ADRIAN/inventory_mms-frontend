import React, { useContext, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  GridItem,
  Select,
  Grid,
  Button,
  useToast,
  InputLeftAddon,
  InputGroup,
  Stack,
  Box,
  Divider,
  SimpleGrid,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import useAuth from "../../Hooks/useAuth";
import localApi from "../../API/Api";
import SearchSel from "../searchableSelect/searchSel";
import DataContext from "../../Context/Context";
import { VerticallyCenter } from "../inputModal";

const Equipment = ({ setTab }) => {
  const {
    setRemarks,
    remarks,
    postInventory,
    selectedLoc,
    selectedCond,
    clearAll,
  } = useContext(DataContext);

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
  const [barcode, setBarcode] = useState("");
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

  //
  const [isIN, setIN] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  //
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


  //Bar Code
  useEffect(() => {
    const handleKeyPress = (event) => {
      const barcodeRegex = /^[0-9]+$/; // only allow digits in barcode
      const pressedKey = event.key;
      const isBarcode = barcodeRegex.test(pressedKey);

      if (isBarcode) {
        setBarcode((prevBarcode) => prevBarcode + pressedKey);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  //Clear Form
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
        details
    );
  }, [article, articleOther, type, typeOther, model, variant, details, other]);

  const handleCreate = (e) => {
    e && e.preventDefault();
    setIsClick(true);
    // if (cost.length < 1 || cost == 0) {
    //   onClose();
    //   setIsClick(false);
    //   toast({
    //     title: `Cost cant be null`,
    //     status: "error",
    //     isClosable: true,
    //   });
    //   return;
    // }
    if (!category) {
      onClose();
      setIsClick(false);
      toast({
        title: `Please Select Category`,
        status: "error",
        isClosable: true,
      });
      return;
    }
    if (!article) {
      onClose();
      setIsClick(false);
      toast({
        title: `Please Select Article`,
        status: "error",
        isClosable: true,
      });
      return;
    }
    localApi
      .post("create", {
        isIN: isOpen,
        descOrig: descOrig || null,
        article: article === "Other" ? articleOther : article || null,
        type: type === "Other" ? typeOther : type || null,
        status: itemStatus === "Other" ? itemStatusOther : itemStatus || null,
        model: model || null,
        variant: variant || null,
        details: details || null,
        other: other || null,
        brand: brand || null,
        manufacturer: manufacturer || null,
        countries: origin || null,
        serialNum: serialNum || null,
        warranty: warranty || null,
        acquisition: acquisition || null,
        propertyNum: propertyNum || null,
        unit: unit || null,
        location: location || null,
        acquisitionMode: acquiMode || null,
        supplier: donor === "Other" ? donorOther : donor || null,
        remarkss: remarkss || null,
        expiration: expiration || null,
        cost: cost || null,
        category: category || null,
        accessories: accessories || null,
        barcode: barcode || null,
        userId: user.userId || null,
      })
      .then(function (response) {
        if (response.data.status === 1) {
          if (response.data.isIN === false) {
            // clearForm();
            setIsClick(false);
            setAppState("Item Created");
            setTimeout(() => setAppState(""), 500);
            toast({
              title: !response.data.isnew
                ? "Item already exist"
                : "Item Created",
              description: !response.data.isnew
                ? ""
                : "Added one (1) item to the database",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          } else {
            setIsClick(false);
            postInventory(response.data["new item"]).then((e) => {
              if (e.status == 500) {
                console.log(e.status == 500);
                toast({
                  title: `please check your inputs`,
                  status: "error",
                  isClosable: true,
                });
              } else {
                clearAll();
                toast({
                  title: `New inventory added`,
                  status: "success",
                  isClosable: true,
                });
                if (!selectedLoc) {
                  toast({
                    title: `New location created`,
                    status: "success",
                    isClosable: true,
                  });
                }
                if (!selectedCond) {
                  toast({
                    title: `New Condition created`,
                    status: "success",
                    isClosable: true,
                  });
                }
              }
            });
            setAppState("Item Created");
            setTimeout(() => setAppState(""), 500);
            toast({
              title: response.data.isnew
                ? "Item Created"
                : "Item already exist",
              description: response.data.isnew
                ? "Added one (1) item to the database"
                : "",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          }
        }
      });
  };

  return (
    <Box
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
      bg="#fff"
      borderRadius={8}
      py={{ sm: "8" }}
      px={{ sm: "10" }}
    >
      <form onSubmit={handleCreate}>
        <SimpleGrid
          columns={6}
          columnGap={4}
          rowGap={6}
          w="full"
          h={"full"}
          p={[10, 3, 3, 3]}
        >
          <GridItem colSpan={[6, 3, 3, 3]}>
            <FormControl isRequired w={{ lg: 400, md: 300, sm: 250 }}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder=" -- Select Category -- "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Machinery</option>
                <option>Office Equipment</option>
                <option>Informartion and Commumication Technology Equipment</option>
                <option>Agricultural and Forestry</option>
                <option>Marine and Fishery</option>
                <option>Airport Equipment</option>
                <option>Communication Equipment</option>
                <option>Disaster Response and Rescue Equipment</option>
                <option>Military Police and Security</option>
                <option>Medical Equipment</option>
                <option>Printing Equipment</option>
                <option>Sports Equipment</option>
                <option>Technincal and Scientific Equipment</option>
                <option>Other Machinery and Equipment</option>
                <option>Furnitures and Fixtures</option>
                <option>Books</option>
                <option>Other</option>
              </Select>
            </FormControl>
          </GridItem>

          <GridItem colSpan={[6, 3, 3, 3]}> 
          <FormLabel>Bar Code Number</FormLabel>
            <Input isDisabled value={barcode} onChange={(e)=>setBarcode(e.target.value)}/>
          </GridItem>

          <GridItem colSpan={6}>
            <FormControl isRequired>
              <FormLabel>Item Description</FormLabel>
              <Textarea isReadOnly background="#eee" disabled value={desc} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={[6, 6, 2, 2]}>
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
          </GridItem>

          <GridItem colSpan={[6, 6, 2, 2]}>
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
          </GridItem>

          <GridItem colSpan={[6, 6, 2, 2]}>
            <FormControl>
              <FormLabel>Model</FormLabel>
              <Input value={model} onChange={(e) => setModel(e.target.value)} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={[6, 6, 2, 2]}>
            <FormControl>
              <FormLabel>Variety/Color</FormLabel>
              <Textarea
                resize={"none"}
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
              <Textarea value={other} onChange={(e) => setOther(e.target.value)} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={[6, 6, 2, 2]}>
            <FormControl>
              <FormLabel>Brand</FormLabel>
              <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
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
              <Input value={unit} onChange={(e) => setUnit(e.target.value)} />
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

          <VerticallyCenter
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            isItemInserted={true}
            post={handleCreate}
            isClick={isClick}
          ></VerticallyCenter>

          <GridItem colSpan={6}>
            <HStack
              display={"flex"}
              flexDirection={{ lg: "row", md: "column", sm: "column" }}
            >
              <Divider border={4} />
              <Button
                padding={"0px 40px 0px 40px"}
                colorScheme="blue"
                onClick={() => {
                  // setIN(!isIN);
                  // clearAll();
                  onOpen();
                }}
              >
                {"Make IN"}
              </Button>
              <Divider border={4} />
            </HStack>
          </GridItem>

          <GridItem
            display="flex"
            columnGap={2}
            colSpan={6}
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
          </GridItem>
        </SimpleGrid>
      </form>
    </Box>
  );
};

export default Equipment;