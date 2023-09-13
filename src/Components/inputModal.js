import { useContext, useEffect, useRef, useState } from "react";
import DataContext from "../Context/Context";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  GridItem,
  Divider,
  Text,
  Flex,
  Stack,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  SimpleGrid,
  ModalOverlay,
  Grid,
} from "@chakra-ui/react";
import SearchSel from "./searchableSelect/searchSel";
import { EditIcon, CloseIcon } from "@chakra-ui/icons";
import EditableDet from "./EditableDet";
import PARTab from "./PARTab";
import { SearchPO } from "./Searchable-Select";

export const VerticallyCenter = ({
  title,
  children,
  isOpen,
  onClose,
  isItemInserted,
  post,
  isClick,
  tabStatus,
}) => {
  const {
    itemdetails,
    setdeliveryD,
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
    setInv,
    inv,
    barcode,
    setBarcode,
  } = useContext(DataContext);

  const [tab, setTab] = useState("");

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

          <Text flex={1} textAlign={"right"}>
            {detail}
          </Text>
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
          setInv(false);
        }}
        size={"full"}
        isOpen={isOpen}
        isCentered
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent w={"60%"} minW={"60%"}>
          <ModalCloseButton />
          <ModalBody p={10}>
            <SimpleGrid mt={6} rowGap={6} columns={12} columnGap={5}>
              <GridItem
                colSpan={6}
                mb={8}
                display={inv === false ? "none" : ""}
              >
                <FormControl>
                  <FormLabel color={"blackAlpha.600"}>Barcode</FormLabel>
                  <Input
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2} w="100%">
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

              <GridItem colSpan={2} w="100%">
                <Box>
                  <SearchSel
                    name={"Accountable Off."}
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
              <GridItem colSpan={2} w="100%">
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
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel color={"blackAlpha.600"}>Delivery Date</FormLabel>
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
              <GridItem colSpan={2} w="100%">
                <FormControl>
                  <FormLabel color={"blackAlpha.600"}>Property No.</FormLabel>
                  <Input
                    onClick={() => {}}
                    //value={ }
                    onChange={(e) => {
                      setpropertyno(e.target.value);
                    }}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2} w="100%">
                <FormControl>
                  <FormLabel color={"blackAlpha.600"}>Serial</FormLabel>
                  <Input
                    onClick={() => {}}
                    onChange={(e) => {
                      setserial(e.target.value);
                    }}
                  />
                </FormControl>
              </GridItem>
            </SimpleGrid>

            <GridItem colSpan={6}>
                <PARTab />
              </GridItem>

              <GridItem colSpan={6} w="100%">
                <FormControl>
                  <FormLabel color={"blackAlpha.600"}>Remarks</FormLabel>
                  <Textarea
                    onClick={() => {}}
                    //value={ }
                    onChange={(e) => {
                      setRemarks(e.target.value);
                    }}
                  />
                </FormControl>
              </GridItem>

            {/* {!isItemInserted && (
                <>
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

                      {itemdetails != null &&
                        Object.keys(itemdetails[0]).map((e, i) => (
                          <CardDet
                            key={i}
                            bg={i % 2 == 0 && "#f3f7fa"}
                            property={e}
                            detail={itemdetails[0][e]}
                          />
                        ))}
                    </Stack>
                  </Box>
                </>
              )} */}
          </ModalBody>
          <ModalFooter>
            {isItemInserted ? (
              <Button
                colorScheme={"blue"}
                isLoading={isClick}
                onClick={() => {
                  console.log("aa");
                  post();
                }}
              >
                Create Item & IN
              </Button>
            ) : (
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
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
