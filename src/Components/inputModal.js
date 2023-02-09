import { useContext, useEffect, useRef, useState } from "react";
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
  useDisclosure,
  SimpleGrid,
  Grid,
  GridItem,
  Divider,
  Center,
  Text,
  Square,
  Flex,
  Stack,
  Box,
  Heading,
  Image,
  FormControl,
  FormLabel,
  Input,
  useToast,
  color,
  InputRightElement,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import SearchSel from "./searchableSelect/searchSel";
import { EditIcon, CloseIcon } from "@chakra-ui/icons";

export const VerticallyCenter = ({ title, children, isOpen, onClose }) => {
  const {
    itemdetails,
    setdeliveryD,
    setquantity,
    setLoose,
    setRemarks,
    postInventory,
    locDatas,
    locValue,
    setLocValue,
    selectedLoc,
    setSelectedLoc,
    fetchLoc,
    condDatas,
    condItem,
    setConItem,
    selectedCond,
    setSelectedCond,
    fetchcond,
    clearAll,
    assocDatas,
    assocValue,
    setassocValue,
    selectedAssoc,
    setSelectedAssoc,
    fetchAssoc,
    setpropertyno,
    setserial,
    varietyDatas,
    varietyVal,
    setVarietyVal,
    selectedVariety,
    setSelectedVariety,
    fetchVar,
  } = useContext(DataContext);
  const editable = [
    "Variety",
    "Country origin",
    "Details",
    "Warranty",
    "Acquisition Date",
    "Expiration Date",
  ];
  const Ddown = ["Variety", "Country origin"];
  const editableDate = ["Warranty", "Acquisition Date", "Expiration Date"];
  const toast = useToast();
  const CardDet = ({ property, detail, bg }) => {
    const [isEdit, setEdit] = useState(false);
    return (
      <Box bg={bg} fontSize={15} color={"blackAlpha.600"} w={"100%"} h={"auto"}>
        <Divider orientation="horizontal" />
        <Flex flexDirection={"row"} gap={0}>
          <Text flex={1} fontWeight={"500"}>
            {property}
          </Text>
          <Box
            onDoubleClick={() => {
              setEdit(true);
            }}
          >
            {isEdit && editable.includes(property) ? (
              editableDate.includes(property) ? (
                <InputGroup>
                  <InputRightElement>
                    <CloseIcon
                      style={
                        editable.includes(property) && { cursor: "pointer" }
                      }
                      w={3}
                      onClick={() => {
                        setEdit(false);
                      }}
                    ></CloseIcon>
                  </InputRightElement>
                  <Input onChange={(e) => {}} type="date"></Input>
                </InputGroup>
              ) : Ddown.includes(property) ? (
                children
              ) : (
                // <SearchSel
                //   data={varietyDatas}
                //   propertyName={"variety"}
                //   fetchdat={fetchVar}
                //   setSelect={setSelectedVariety}
                //   isSelect={selectedVariety}
                //   setValue={setVarietyVal}
                //   valueD={varietyVal}
                //   isDrop={true}
                //   mode={"edit"}
                //   setModEdit={setEdit}
                // ></SearchSel>
                <SearchSel mode={"edit"} setModEdit={setEdit}></SearchSel>
              )
            ) : (
              <Text
                fontWeight={editable.includes(property) && "black"}
                color={editable.includes(property) && "black"}
                flex={1}
                textAlign={"right"}
              >
                {detail}
                {editable.includes(property) && (
                  <EditIcon
                    w={8}
                    onClick={() => {
                      setEdit(true);
                    }}
                    style={editable.includes(property) && { cursor: "pointer" }}
                  ></EditIcon>
                )}
              </Text>
            )}
          </Box>
        </Flex>
      </Box>
    );
  };

  //

  return (
    <>
      <Modal
        onClose={() => {
          onClose();
          clearAll();
        }}
        size={"full"}
        isOpen={isOpen}
        isCentered
      >
        <ModalContent w={"60%"} minW={"60%"} margin={"100px"}>
          <ModalHeader>
            {title}
            {/* {selectedLoc && selectedLoc.Pk_locationId}
            {selectedAssoc && selectedAssoc.Pk_assocId} */}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* {children} */}
            <Flex color={"blackAlpha.600"} h={"70vh"}>
              <Box flex={8} alignSelf={"center"}>
                <Grid
                  alignItems={"center"}
                  templateColumns="repeat(6, 1fr)"
                  gap={6}
                  paddingEnd={5}
                >
                  <GridItem colSpan={3} w="100%">
                    <Box>
                      <SearchSel
                        name={"Locations"}
                        data={locDatas}
                        propertyName={"location_name"}
                        fetchdat={fetchLoc}
                        setSelect={setSelectedLoc}
                        isSelect={selectedLoc}
                        setValue={setLocValue}
                        valueD={locValue}
                      />
                    </Box>
                  </GridItem>

                  <GridItem colSpan={3} w="100%">
                    <Box>
                      <SearchSel
                        name={"Associate"}
                        data={assocDatas}
                        propertyName={"person_name"}
                        fetchdat={fetchAssoc}
                        setSelect={setSelectedAssoc}
                        isSelect={selectedAssoc}
                        setValue={setassocValue}
                        valueD={assocValue}
                      />
                    </Box>
                  </GridItem>
                  <GridItem colSpan={3} w="100%">
                    <Box>
                      <SearchSel
                        name={"Condition"}
                        data={condDatas}
                        propertyName={"conditions_name"}
                        fetchdat={fetchcond}
                        setSelect={setSelectedCond}
                        isSelect={selectedCond}
                        setValue={setConItem}
                        valueD={condItem}
                      />
                    </Box>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <FormControl>
                      <FormLabel>Delivery Date</FormLabel>
                      <Input
                        // value={acquisition}
                        onChange={(e) => {
                          setdeliveryD(e.target.value);
                          //console.log(e.target.value);
                        }}
                        type="date"
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={3} w="100%">
                    <FormControl>
                      <FormLabel>Quantity</FormLabel>
                      <Input
                        onClick={() => {
                          //fetchdat(null);
                          //setVisible(!isVisible);
                        }}
                        //value={ }
                        onChange={(e) => {
                          setquantity(e.target.value);
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={3} w="100%">
                    <FormControl>
                      <FormLabel>Property No.</FormLabel>
                      <Input
                        onClick={() => {}}
                        //value={ }
                        onChange={(e) => {
                          setpropertyno(e.target.value);
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={3} w="100%">
                    <FormControl>
                      <FormLabel>Serial</FormLabel>
                      <Input
                        onClick={() => {}}
                        onChange={(e) => {
                          setserial(e.target.value);
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={3} w="100%">
                    <FormControl>
                      <FormLabel>Loose</FormLabel>
                      <Input
                        onClick={() => {
                          //fetchdat(null);
                          //setVisible(!isVisible);
                        }}
                        //value={ }
                        onChange={(e) => {
                          setLoose(e.target.value);
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={6} w="100%">
                    <FormControl>
                      <FormLabel>Remarks</FormLabel>
                      <Input
                        variant="flushed"
                        onClick={() => {
                          //fetchdat(null);
                          //setVisible(!isVisible);
                        }}
                        //value={ }
                        onChange={(e) => {
                          setRemarks(e.target.value);
                        }}
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
              </Box>

              <Divider orientation="vertical"></Divider>
              <Box flex="6" overflowY={"auto"} paddingRight={2}>
                <Stack gap={0} style={{ padding: "15px 15px" }}>
                  <Heading
                    color={"blackAlpha.600"}
                    style={{ fontFamily: "poppins" }}
                    fontWeight={"regular"}
                    fontSize={"30"}
                  >
                    Items Description
                  </Heading>
                  <Box
                    fontSize={15}
                    color={"blackAlpha.600"}
                    w={"100%"}
                    h={"auto"}
                  >
                    <Divider orientation="horizontal" />
                    <Flex flexDirection={"row"} gap={5}>
                      <Text flex={1} fontWeight={"500"}>
                        Item Image
                      </Text>
                      <Image
                        boxSize="300px"
                        objectFit="cover"
                        src="https://cdn-icons-png.flaticon.com/128/1160/1160358.png"
                        alt="Dan Abramov"
                      ></Image>
                    </Flex>
                  </Box>

                  {itemdetails != null &&
                    Object.keys(itemdetails[0]).map((e, i) => {
                      if ((e = "Variety")) {
                        <CardDet
                          key={i}
                          bg={i % 2 == 0 && "#f3f7fa"}
                          property={e}
                          detail={itemdetails[0][e]}
                        >
                          <SearchSel
                            data={varietyDatas}
                            propertyName={"variety"}
                            fetchdat={fetchVar}
                            setSelect={setSelectedVariety}
                            isSelect={selectedVariety}
                            setValue={setVarietyVal}
                            valueD={varietyVal}
                            isDrop={true}
                            mode={"edit"}
                            setModEdit={setEdit}
                          ></SearchSel>
                        </CardDet>;
                      } else if ((e = "Country origin")) {
                        <></>;
                      }
                    })}
                </Stack>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={"teal"}
              onClick={() => {
                postInventory().then((e) => {
                  if (e.status == 500) {
                    console.log(e.status == 500);
                    toast({
                      title: `please check your inputs`,
                      status: "error",
                      isClosable: true,
                    });
                  } else {
                    clearAll();
                    onClose();
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
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
