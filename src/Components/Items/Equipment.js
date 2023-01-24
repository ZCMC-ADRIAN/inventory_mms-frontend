import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  SimpleGrid,
  GridItem,
  Select,
  Button,
  useToast,
  InputLeftAddon,
  InputGroup,
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
  const [remarks, setRemarks] = useState("");
  const [category, setCategory] = useState("Equipment");
  const [cost, setCost] = useState(0);
  const [accessories, setAccessories] = useState("");
  const { user } = useAuth();

  //Utilities State
  const todate = new Date();
  const toast = useToast();
  const [isClick, setIsClick] = useState(false);

  //In state
  const [lot, setLot] = useState("");
  const [expiration, setExpiration] = useState("");
  const [iar, setIar] = useState("");
  const [iarDate, setIarDate] = useState("");
  const [delivery, setDelivery] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [itemStatusOther, setItemStatusOther] = useState("");

  //Fields
  const [getArticle, setGetArticle] = useState([]);
  const [getTypes, setGetTypes] = useState([]);
  const [getStatus, setGetStatus] = useState([]);

  const fetchData = async () => {
    let responseArticle = await localApi.get("article");
    setGetArticle(responseArticle.data);

    let responseTypes = await localApi.get("types", {
      params: { article: article },
    });
    setGetTypes(responseTypes.data);

    let responseStatus = await localApi.get("status");
    setGetStatus(responseStatus.data);
  };

  useEffect(() => {
    fetchData();
  }, [type, article]);

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
    setLot("");
    setExpiration("NOT INDICATED");
    setIar("");
    setIarDate("");
    setDelivery("");
    setAccessories("");
    setItemStatus("");
    setItemStatusOther("");
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
        acquisitionMode: donors.includes(donor.toLocaleLowerCase())
          ? "Donation"
          : "Purchase",
        supplier: donor,
        remarks: remarks,
        expiration: expiration,
        IAR: iar,
        IAR_Date: iarDate,
        delivery: delivery,
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
    <>
      <form onSubmit={handleCreate}>
        <SimpleGrid
          columns={6}
          columnGap={4}
          rowGap={6}
          w="full"
          h={"full"}
          p={6}
        >
          <GridItem colSpan={3}>
            <FormControl isRequired>
              <FormLabel>Item Description (Original)</FormLabel>
              <Textarea
                value={descOrig}
                onChange={(e) => setDescOrig(e.target.value)}
                placeholder="Original Description"
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={3}>
            <FormControl isRequired>
              <FormLabel>Item Description</FormLabel>
              <Textarea isReadOnly background="#eee" disabled value={desc} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
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

          <GridItem colSpan={2}>
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

          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Model</FormLabel>
              <Input value={model} onChange={(e) => setModel(e.target.value)} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Variety/Color</FormLabel>
              <Input
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={3}>
            <FormControl>
              <FormLabel>Details2</FormLabel>
              <Textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={3}>
            <FormControl>
              <FormLabel>Accessories</FormLabel>
              <Textarea
                value={accessories}
                onChange={(e) => setAccessories(e.target.value)}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
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

          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Other</FormLabel>
              <Input value={other} onChange={(e) => setOther(e.target.value)} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Brand</FormLabel>
              <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Manufacturer</FormLabel>
              <Input
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Country of Origin</FormLabel>
              <Input
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Serial Number</FormLabel>
              <Input
                value={serialNum}
                onChange={(e) => setSerialNum(e.target.value)}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Warranty</FormLabel>
              <Input
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                type="date"
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Acquisition Date</FormLabel>
              <Input
                value={acquisition}
                onChange={(e) => setAcquisition(e.target.value)}
                type="date"
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Property Number</FormLabel>
              <Input
                value={propertyNum}
                onChange={(e) => setPropertyNum(e.target.value)}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Unit</FormLabel>
              <Input value={unit} onChange={(e) => setUnit(e.target.value)} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Supplier/Donor</FormLabel>
              <Input value={donor} onChange={(e) => setDonor(e.target.value)} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
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

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Lot/Serial #</FormLabel>
              <Input value={lot} onChange={(e) => setLot(e.target.value)} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
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

          <GridItem colSpan={2} width="100%">
            <FormControl>
              <FormLabel>IAR #</FormLabel>
              <Input value={iar} onChange={(e) => setIar(e.target.value)} />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>IAR Date</FormLabel>
              <Input
                value={iarDate}
                onChange={(e) => setIarDate(e.target.value)}
                type="date"
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Delivery Date</FormLabel>
              <Input
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
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

        <HStack marginTop={5} justifyContent="flex-end">
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
      </form>
    </>
  );
};

export default Equipment;
