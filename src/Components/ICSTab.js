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

const ICSTab = ({
  title,
  children,
  isOpen,
  onClose,
  isItemInserted,
  post,
  isClick,
  tab
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
  } = useContext(DataContext);

  const toast = useToast();

  return (
    <div>
      <ModalCloseButton />
      <ModalBody mt={10}>
        <Flex>
          <Box flex={8} alignSelf={"center"}>
            <Grid
              alignItems={"center"}
              templateColumns="repeat(6, 1fr)"
              gap={6}
              paddingEnd={5}
            >
              <GridItem colSpan={3}>
                <FormControl>
                  <FormLabel color={"blackAlpha.600"}>PO #</FormLabel>
                  <Input value={PO} onChange={(e) => setPO(e.target.value)}/>
                </FormControl>
              </GridItem>

              <GridItem colSpan={3}>
                <FormControl color={"blackAlpha.600"}>
                  <FormLabel>PO Date</FormLabel>
                  <Input type="date" value={PODate} onChange={(e) => setPODate(e.target.value)}/>
                </FormControl>
              </GridItem>

              <GridItem colSpan={3}>
                <FormControl color={"blackAlpha.600"}>
                  <FormLabel>Invoice #</FormLabel>
                  <Input value={invoice} onChange={(e) => setInvoice(e.target.value)}/>
                </FormControl>
              </GridItem>

              <GridItem colSpan={3}>
                <FormControl color={"blackAlpha.600"}>
                  <FormLabel>Invoice Date</FormLabel>
                  <Input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)}/>
                </FormControl>
              </GridItem>

              <GridItem colSpan={3}>
                <FormControl color={"blackAlpha.600"}>
                  <FormLabel>ORS/BURS #</FormLabel>
                  <Input value={ors} onChange={(e) => setOrs(e.target.value)}/>
                </FormControl>
              </GridItem>

              <GridItem colSpan={6}>
                <FormControl color={"blackAlpha.600"}>
                  <FormLabel>Remarks</FormLabel>
                  <Textarea value={ICSRemarks} onChange={(e) => setICSRemarks(e.target.value)}/>
                </FormControl>
              </GridItem>
            </Grid>
          </Box>
        </Flex>
      </ModalBody>
      <ModalFooter mt={20}>
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
