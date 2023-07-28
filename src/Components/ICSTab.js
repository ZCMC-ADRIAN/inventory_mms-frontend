import React, { useContext } from "react";
import DataContext from "../Context/Context";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Grid,
  GridItem,
  Divider,
  Text,
  Flex,
  Stack,
  Box,
  Heading,
  Image,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { SearchPO } from "./Searchable-Select";

const ICSTab = ({
  title,
  children,
  isOpen,
  onClose,
  isItemInserted,
  post,
  isClick,
  tab,
}) => {
  const {
    postInventory,
    selectedLoc,
    selectedCond,
    clearAll,
    PO,
    setPO,
    PODate,
    setPODate,
    invoice,
    setInvoice,
    invoiceDate,
    setInvoiceDate,
    ors,
    setOrs,
    ICSRemarks,
    setICSRemarks,
    ics, setIcs,
    ICSIAR, setICSIAR,
    ICSDRF, setICSDRF,
    ICSDRFDate, setICSDRFDate,
    ICSPTR, setICSPTR,

  } = useContext(DataContext);

  const toast = useToast();

  return (
    <div>
      <ModalCloseButton />
      <ModalBody mt={5}>
        <Flex>
          <Box flex={8} alignSelf={"center"}>
            <Grid
              alignItems={"center"}
              templateColumns="repeat(6, 1fr)"
              gap={6}
              paddingEnd={5}
            >
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel color={"blackAlpha.600"}>PO #</FormLabel>
                  {/* <Input value={PO} onChange={(e) => setPO(e.target.value)} /> */}
                  <SearchPO />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl color={"blackAlpha.600"}>
                  <FormLabel>PO Date</FormLabel>
                  <Input
                    type="date"
                    value={PODate}
                    onChange={(e) => setPODate(e.target.value)}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl color={"blackAlpha.600"}>
                  <FormLabel>Invoice #</FormLabel>
                  <Input
                    value={invoice}
                    onChange={(e) => setInvoice(e.target.value)}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl color={"blackAlpha.600"}>
                  <FormLabel>Invoice Date</FormLabel>
                  <Input
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl color={"blackAlpha.600"}>
                  <FormLabel>ORS/BURS #</FormLabel>
                  <Input value={ors} onChange={(e) => setOrs(e.target.value)} />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl color={"blackAlpha.600"}>
                  <FormLabel>IAR #</FormLabel>
                  <Input value={ICSIAR} onChange={(e) => setICSIAR(e.target.value)} />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel color={"blackAlpha.600"}>DRF #</FormLabel>
                  <Input value={ICSDRF} onChange={(e) => setICSDRF(e.target.value)} />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl color={"blackAlpha.600"}>
                  <FormLabel>DRF Date</FormLabel>
                  <Input
                    type="date"
                    value={ICSDRFDate}
                    onChange={(e) => setICSDRFDate(e.target.value)}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel color={"blackAlpha.600"}>PTR #</FormLabel>
                  <Input value={ICSPTR} onChange={(e) => setICSPTR(e.target.value)} />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl color={"blackAlpha.600"}>
                  <FormLabel>ICS Number (For Old Items)</FormLabel>
                  <Input
                    value={ics}
                    onClick={() => {}}
                    onChange={(e) => {
                      setIcs(e.target.value);
                    }}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={6}>
                <FormControl color={"blackAlpha.600"}>
                  <FormLabel>Remarks</FormLabel>
                  <Textarea
                    value={ICSRemarks}
                    onChange={(e) => setICSRemarks(e.target.value)}
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </Box>
        </Flex>
      </ModalBody>
      <ModalFooter mt={5}>
        {isItemInserted ? (
          <Button
            colorScheme={"blue"}
            isLoading={isClick}
            onClick={() => {
              console.log("aa");
              post();
              // postInventory().then((e) => {
              //   if (e.status == 500) {
              //     console.log(e.status == 500);
              //     toast({
              //       title: `please check your inputs`,
              //       status: "error",
              //       isClosable: true,
              //     });
              //   } else {
              //     clearAll();
              //     onClose();
              //     toast({
              //       title: `New inventory added`,
              //       status: "success",
              //       isClosable: true,
              //     });
              //     if (!selectedLoc) {
              //       toast({
              //         title: `New location created`,
              //         status: "success",
              //         isClosable: true,
              //       });
              //     }
              //     if (!selectedCond) {
              //       toast({
              //         title: `New Condition created`,
              //         status: "success",
              //         isClosable: true,
              //       });
              //     }
              //   }
              // });
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
    </div>
  );
};

export default ICSTab;
