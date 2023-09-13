import React, { useContext, useEffect, useState, useRef } from "react";
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
  Menu,
  MenuButton,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ChakraProvider,
} from "@chakra-ui/react";
import useAuth from "../../Hooks/useAuth";
import localApi from "../../API/Api";
import SearchSel from "../searchableSelect/searchSel";
import DataContext from "../../Context/Context";
import { VerticallyCenter } from "../inputModal";
import AttachEquipment from "../AttachEquipment";
import AttachExistingEquipment from "../Searchable-Select";

const Equipment = ({ setTab }) => {
  const {
    postInventory,
    handleSubmit,
    selectedLoc,
    selectedCond,
    clearAll,
    propertyno,
    article,
    articleOther,
    type,
    typeOther,
    descOrig,
    desc,
    model,
    variant,
    variantOther,
    detailss,
    other,
    brand,
    brandOther,
    manufacturer,
    manufacturerOther,
    origin,
    serialNum,
    warrantyy,
    acquisitions,
    propertyNum,
    unit,
    location,
    donor,
    donorOther,
    remarkss,
    category,
    cost,
    accessories,
    acquiMode,
    barcode,
    user,
    barCodeRef,
    setArticle,
    setArticleOther,
    setType,
    setTypeOther,
    setDesc,
    setModel,
    setVariant,
    setVariantOther,
    setDetails,
    setOther,
    setBrand,
    setBrandOther,
    setManufacturer,
    setManufacturerOther,
    setOrigin,
    setWarranty,
    setAcquisition,
    setUnit,
    setDonor,
    setDonorOther,
    setCategory,
    setCost,
    setAccessories,
    setAcquiMode,
    setBarcode,
    setSeries,
    setGetCateg,
    inv,
    create,
    setCreate,
    peripArticle,
    peripMode,
    getArticle, setGetArticle,
    getTypes, setGetTypes,
    getVariant, setGetVariant,
    getBrand, setGetBrand,
    getManufacturer, setGetManufacturer,
    getSupplier, setGetSupplier,
    addType, setAddType,
    addArticle, setAddArticle,
    addVariant, setaddVariant,
    addBrand, setAddBrand,
    addManufacturer, setAddManufacturer,
    setPeripTypes,
    setAddTypes,
    fundCluster, setFundCluster,
    otherCluster, setOtherCluster,
    getCluster, setGetCluster,
    isNew, setIsNew,

    //PAR & ICS
    DRF,
    DRFDate,
    IAR,
    poNum,
    PTR,
    PODate,
    Invoice,
    ors,
    Conformed,
    InvoiceDate,
    clearPAR
  } = useContext(DataContext);

  //Utilities State
  const todate = new Date();
  const toast = useToast();
  const [isClick, setIsClick] = useState(false);

  //In state
  const [expiration, setExpiration] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [itemStatusOther, setItemStatusOther] = useState("");

  //Fields
  const [getStatus, setGetStatus] = useState([]);

  //
  const [isIN, setIN] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const click = new useDisclosure();

  const [selectedArticle, setSelectedArticle] = useState();
  const [selectedType, setSelectedType] = useState();
  const [selectedVariant, setSelectedVariant] = useState();
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedManufacturer, setSelectedManufacturer] = useState();


  //
  const fetchData = async () => {
    let responseArticle = await localApi.get("article");
    setGetArticle(responseArticle.data);

    let responseVariant = await localApi.get("variety");
    setGetVariant(responseVariant.data);
    
    let responseBrand = await localApi.get("brand");
    setGetBrand(responseBrand.data);

    let responseManufacturer = await localApi.get("manufacturer");
    setGetManufacturer(responseManufacturer .data);

    let responseCateg = await localApi.get("code", {
      params: { categ: category },
    });
    setGetCateg(responseCateg.data);

    let responseStatus = await localApi.get("status");
    setGetStatus(responseStatus.data);

    let responseSupplier = await localApi.get("supplier", {
      params: { acquiMode: acquiMode === "" ? peripMode : acquiMode },
    });
    setGetSupplier(responseSupplier.data);

    let responseCluster = await localApi.get("cluster");
    setGetCluster(responseCluster.data);
  };

  const fetchSeries = async () => {
    let responseSeries = await localApi.get("series", {
      params: { cost: cost },
    });
    setSeries(responseSeries.data);
  };

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const responseTypes = await localApi.get("types", {
          params: {
            article: article,
            peripArticle: peripArticle,
            addArticle: addArticle,
          },
        });

        // Assuming the response contains 'articleTypes', 'peripArticleTypes', and 'addArticleTypes'
        const { articleTypes, peripArticleTypes, addArticleTypes } = responseTypes.data;

        if (articleTypes) {
          setGetTypes(articleTypes);
        }

        if (peripArticleTypes) {
          setPeripTypes(peripArticleTypes);
        }

        if (addArticleTypes) {
          setAddTypes(addArticleTypes);
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchTypes();
  }, [article, peripArticle, addArticle]);

  useEffect(() => {
    fetchSeries();
  }, [cost]);

  useEffect(() => {
    fetchData();
  }, [type, article, variant, brand, manufacturer, acquiMode, cost, category, peripArticle, peripMode, addArticle, addType, addVariant, addBrand, addManufacturer]);

  useEffect(() => {
    barCodeRef.current.focus();
  }, [isOpen]);

  //Clear Form
  const clearForm = () => {
    setBarcode("");
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
      (variant === "Other" ? variantOther : variant) +
      " " +
      (brand === "Other" ? brandOther : brand) +
      " " +
      detailss
    );
  }, [article, articleOther, type, typeOther, model, variant, variantOther, brand, brandOther, detailss, other]);

  const handleCreate = (e) => {
    e && e.preventDefault();
    setIsClick(true);
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
        variant: variant === "Other" ? variantOther : variant || null,
        brand: brand === "Other" ? brandOther : brand || null,
        manufacturer: manufacturer === "Other" ? manufacturerOther : manufacturer || null,
        status: itemStatus === "Other" ? itemStatusOther : itemStatus || null,
        model: model || null,
        // variant: variant || null,
        details: detailss || null,
        other: other || null,
        // brand: brand || null,
        // manufacturer: manufacturer || null,
        countries: origin || null,
        serialNum: serialNum || null,
        warranty: warrantyy || null,
        acquisition: acquisitions || null,
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
        property_no: propertyno || null,
        // PARRemarks: PARRemarks || null,
        //
        inv: inv || null,
        create: create,
        userId: user.userId || null,
        articleId: selectedArticle || null,
        typeId: selectedType || null,
        variantId: selectedVariant || null,
        brandId: selectedBrand || null,
        manufacturerId: selectedManufacturer || null,
      })
      .then(async function (response) {
        if (response.data.status === 1) {
          await fetchSeries();
          handleSubmit(response.data);
          console.log(response.data.isIN)
          if (response.data.isIN === false) {
            setIsNew(true);
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
                clearPAR();
                // clearICS();
                clearForm();
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
            <FormControl isRequired w={{ lg: 330, md: 300, sm: 250 }}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder=" -- Select Category -- "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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

          <GridItem colSpan={[6, 3, 3, 3]}>
            <FormLabel>Bar Code Number</FormLabel>
            <Input
              ref={barCodeRef}
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />
          </GridItem>

          <GridItem colSpan={6}>
            <FormControl isRequired>
              <FormLabel>Item Description</FormLabel>
              <Textarea isReadOnly background="#eee" disabled value={desc} />
            </FormControl>
          </GridItem>

          {/* <GridItem colSpan={[6, 6, 2, 2]}>
            <FormLabel>Attach to Existing Equipment</FormLabel>
            <AttachExistingEquipment />
          </GridItem> */}

          <GridItem colSpan={[6, 6, 2, 2]}>
            <FormControl>
              <FormLabel>Article</FormLabel>
              <Select
                value={article}
                onChange={(e) => {
                  setArticle(e.target.value);
                  setSelectedArticle(
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-id"
                    )
                  );
                  setTypeOther("");
                  setType("");
                }}
                placeholder="- Select Article -"
              >
                {getArticle.map((item, index) => {
                  return (
                    <option
                      value={item.article_name}
                      key={index}
                      data-id={item.Pk_articleId}
                    >
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
                onChange={(e) => {
                  setType(e.target.value);
                  setSelectedType(
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-id"
                    )
                  );
                }}
                placeholder="- Select Type/Form -"
              >
                <option value="Other">Other</option>
                {getTypes.map((item, index) => {
                  if (article != "") {
                    return (
                      <option
                        value={item.type_name}
                        key={index}
                        data-id={item.Pk_typeId}
                      >
                        {item.type_name}
                      </option>
                    );
                  }
                })}
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
              <Select
                value={variant}
                onChange={(e) => {
                  setVariant(e.target.value);
                  setSelectedVariant(
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-id"
                    )
                  );
                }}
                placeholder="- Select Variant/Color -"
              >
                <option value="Other">Other</option>
                {getVariant.map((item, index) => {
                  return (
                    <option
                      value={item.variety}
                      key={index}
                      data-id={item.Pk_varietyId }
                    >
                      {item.variety}
                    </option>
                  );
                })}
              </Select>
                {variant === "Other" && (
                  <Input
                    value={variantOther}
                    onChange={(e) => setVariantOther(e.target.value)}
                    marginTop={4}
                    variant="filled"
                    placeholder="If other, please specify"
                  />
                )} 
            </FormControl>
          </GridItem>

          <GridItem colSpan={[6, 6, 2, 2]}>
            <FormControl>
              <FormLabel>Brand</FormLabel>
              <Select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setSelectedBrand(
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-id"
                    )
                  );
                }}
                placeholder="- Select Brand -"
              >
                <option value="Other">Other</option>
                {getBrand.map((item, index) => {
                  return (
                    <option
                      value={item.brand_name}
                      key={index}
                      data-id={item.Pk_brandId}
                    >
                      {item.brand_name}
                    </option>
                  );
                })}
              </Select>
              {brand === "Other" && (
                <Input
                  value={brandOther}
                  onChange={(e) => setBrandOther(e.target.value)}
                  marginTop={4}
                  variant="filled"
                  placeholder="If other, please specify"
                />
              )} 
            </FormControl>
          </GridItem>

          <GridItem colSpan={[6, 6, 2, 2]}>
            <FormControl>
              <FormLabel>Manufacturer</FormLabel>
              <Select
                value={manufacturer}
                onChange={(e) => {
                  setManufacturer(e.target.value);
                  setSelectedManufacturer(
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-id"
                    )
                  );
                }}
                placeholder="- Select Manufacturer -"
              >
                <option value="Other">Other</option>
                {getManufacturer.map((item, index) => {
                  return (
                    <option
                    value={item.manu_name}
                    key={index}
                    data-id={item.Pk_manuId }
                    >
                      {item.manu_name}
                    </option>
                  )
                })}
              </Select>
                {manufacturer === "Other" && (
                  <Input
                    value={manufacturerOther}
                    onChange={(e) => setManufacturerOther(e.target.value)}
                    marginTop={4}
                    variant="filled"
                    placeholder="If other, please specify"
                  />
                )} 
            </FormControl>
          </GridItem>

          {/* <GridItem colSpan={[6, 6, 2, 2]}>
            <FormControl>
              <FormLabel>Variety/Color</FormLabel>
              <Textarea
                resize={"none"}
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
              />
            </FormControl>
          </GridItem> */}

          <GridItem colSpan={[6, 6, 2, 2]}>
            <FormControl>
              <FormLabel>Details2</FormLabel>
              <Textarea
                value={detailss}
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
              <FormLabel>Other</FormLabel>
              <Textarea
                value={other}
                onChange={(e) => setOther(e.target.value)}
              />
            </FormControl>
          </GridItem>

          {/* <GridItem colSpan={[6, 6, 2, 2]}>
            <FormControl>
              <FormLabel>Brand</FormLabel>
              <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
            </FormControl>
          </GridItem> */}

          {/* <GridItem colSpan={[6, 6, 2, 2]}>
            <FormControl>
              <FormLabel>Manufacturer</FormLabel>
              <Input
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </FormControl>
          </GridItem> */}

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
              <Select
                value={warrantyy}
                onChange={(e) => setWarranty(e.target.value)}
                placeholder="- Select Warranty -"
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

          {/* <GridItem colSpan={[6, 6, 2, 2]}>
            <FormControl>
              <FormLabel>Preventive Maintenance</FormLabel>
              <Input />
            </FormControl>
          </GridItem> */}

          <GridItem colSpan={[6, 6, 2, 2]}>
            <FormControl>
              <FormLabel>Acquisition Date</FormLabel>
              <Input
                value={acquisitions}
                onChange={(e) => setAcquisition(e.target.value)}
                type="date"
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={[6, 6, 2, 2]}>
            <FormControl>
              <FormLabel>Unit Name</FormLabel>
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
                <option>Regular</option>
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
                  if(acquiMode != ''){
                    return (
                      <option value={item.supplier} key={index}>
                        {item.supplier}
                      </option>
                    );
                  }
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
              <FormLabel>Fund Cluster</FormLabel>
              <Select
                value={fundCluster}
                onChange={(e) => setFundCluster(e.target.value)}
                placeholder="- Select Fund Cluster -"
              >
                {getCluster.map((item, index) => {
                    return (
                      <option value={item.fundCluster} key={index}>
                        {item.fundCluster}
                      </option>
                    );
                })}
                <option value="Other">Other</option>
              </Select>
              {fundCluster === "Other" && (
                <Input
                  value={otherCluster}
                  onChange={(e) => setOtherCluster(e.target.value)}
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

          <VerticallyCenter
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            isItemInserted={true}
            post={handleCreate}
            isClick={isClick}
          ></VerticallyCenter>

          {/* <AttachEquipment
            isOpen={click.isOpen}
            onClose={click.onClose}
            onOpen={click.onOpen}
            articles={getArticle}
            types={getTypes}
            supplier={getSupplier}
          /> */}

          <GridItem colSpan={6} mt={20}>
            <HStack
              display={"flex"}
              flexDirection={{ lg: "row", md: "column", sm: "column" }}
            >
              <Divider border={4} />
              <Button
                padding={"0px 40px 0px 40px"}
                colorScheme="blue"
                onClick={() => {
                  setIN(!isIN);
                  // clearAll();
                  onOpen();
                }}
              >
                {"IN"}
              </Button>

              {/* <Button
                padding={"0px 75px 0px 75px"}
                isDisabled={category === '' ? true : false}
                onClick={() => click.onOpen()}
              >
                {"Attach New Equipment"}
              </Button> */}

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
              onClick={() => setCreate(true)}
            >
              Create Item
            </Button>
          </GridItem>
        </SimpleGrid>
      </form>
    </Box>
  );
};


function CustomSelect() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onOpen();
  };

  const handleModalClose = () => {  
    setSelectedOption(null);
    onClose();
  };

  return (
    <Box width="200px">
      <Select onChange={(e) => handleSelectOption(e.target.value)}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </Select>

      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selected Option</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedOption && (
              <div>
                <p>Selected Option: {selectedOption}</p>
                <Button onClick={handleModalClose}>Close</Button>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Equipment;
