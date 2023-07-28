import React, { useContext } from "react";
import DataContext from "../Context/Context";
import localApi from "../API/Api";
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

const PARTab = ({
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
    DRF,
    setDRF,
    DRFDate,
    setDRFDate,
    IAR,
    setIAR,
    PARRemarks,
    setPARRemarks,
    parPO,
    setParPO,
    PTR,
    setPTR,
    parPODate,
    setParPODate,
    par,
    setPar,
    PARInvoice,
    setPARInvoice,
    PARors,
    setPARors,
    PARConformed,
    setPARConformed,
    PARInvoiceDate,
    setPARInvoiceDate,
  } = useContext(DataContext);

  const toast = useToast();

  return (
    <div>
      <Flex>
        <Box flex={8} alignSelf={"center"} mt={10} borderColor={'black'}>
          <Grid
            alignItems={"center"}
            templateColumns="repeat(6, 1fr)"
            gap={6}
          >
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel color={"blackAlpha.600"}>Invoice #</FormLabel>
                <Input
                  value={PARInvoice}
                  onChange={(e) => setPARInvoice(e.target.value)}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel color={"blackAlpha.600"}>PO #</FormLabel>
                <Input
                  value={parPO}
                  onChange={(e) => setParPO(e.target.value)}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl color={"blackAlpha.600"}>
                <FormLabel>PO Date</FormLabel>
                <Input
                  type="date"
                  value={parPODate}
                  onChange={(e) => setParPODate(e.target.value)}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel color={"blackAlpha.600"}>ORS #</FormLabel>
                <Input
                  value={PARors}
                  onChange={(e) => setPARors(e.target.value)}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl color={"blackAlpha.600"}>
                <FormLabel>PO Conformed</FormLabel>
                <Input
                  type="date"
                  value={PARConformed}
                  onChange={(e) => setPARConformed(e.target.value)}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl color={"blackAlpha.600"}>
                <FormLabel>Invoice Record</FormLabel>
                <Input
                  type="date"
                  value={PARInvoiceDate}
                  onChange={(e) => setPARInvoiceDate(e.target.value)}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl color={"blackAlpha.600"}>
                <FormLabel>IAR #</FormLabel>
                <Input value={IAR} onChange={(e) => setIAR(e.target.value)} />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel color={"blackAlpha.600"}>DRF #</FormLabel>
                <Input value={DRF} onChange={(e) => setDRF(e.target.value)} />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl color={"blackAlpha.600"}>
                <FormLabel>DRF Date</FormLabel>
                <Input
                  type="date"
                  value={DRFDate}
                  onChange={(e) => setDRFDate(e.target.value)}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel color={"blackAlpha.600"}>PTR #</FormLabel>
                <Input value={PTR} onChange={(e) => setPTR(e.target.value)} />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel color={"blackAlpha.600"}>
                  PAR # (For Old Items)
                </FormLabel>
                <Input
                  value={par}
                  onClick={() => {}}
                  onChange={(e) => {
                    setPar(e.target.value);
                  }}
                />
              </FormControl>
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </div>
  );
};

export default PARTab;
