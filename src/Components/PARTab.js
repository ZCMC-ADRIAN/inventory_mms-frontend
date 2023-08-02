import React, { useContext } from "react";
import DataContext from "../Context/Context";
import localApi from "../API/Api";
import { SearchPO } from "./Searchable-Select";
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
    DRF,
    setDRF,
    DRFDate,
    setDRFDate,
    IAR,
    setIAR,
    PTR,
    setPTR,
    PODate,
    setPODate,
    par,
    setPar,
    Invoice,
    setInvoice,
    ors,
    setors,
    Conformed,
    setConformed,
    InvoiceDate,
    setInvoiceDate,
    acquiMode,
    poSelected,
    inv
  } = useContext(DataContext);

  const toast = useToast();

  return (
    <div>
      <Flex display={inv == true ? 'none': ''}>
        <Box flex={8} alignSelf={"center"} mt={10} borderColor={"black"}>
          <Grid alignItems={"center"} templateColumns="repeat(6, 1fr)" gap={6}>

            <GridItem
              colSpan={2}
              display={acquiMode != "Regular" ? "none" : ""}
            >
              <FormControl>
                <FormLabel color={"blackAlpha.600"}>PO #</FormLabel>
                {/* <Input
                  value={parPO}
                  onChange={(e) => setParPO(e.target.value)}
                /> */}
                <SearchPO />
              </FormControl>
            </GridItem>

            <GridItem
              colSpan={2}
              display={acquiMode != "Regular" ? "none" : ''}
            >
              <FormControl>
                <FormLabel color={"blackAlpha.600"}>Invoice #</FormLabel>
                <Input
                  value={Invoice}
                  onChange={(e) => setInvoice(e.target.value)}
                  isDisabled = {poSelected === true ? true : false}
                />
              </FormControl>
            </GridItem>

            <GridItem
              colSpan={2}
              display={acquiMode != "Regular" ? "none" : ""}
            >
              <FormControl color={"blackAlpha.600"}>
                <FormLabel>PO Date</FormLabel>
                <Input
                  type="date"
                  value={PODate}
                  onChange={(e) => setPODate(e.target.value)}
                />
              </FormControl>
            </GridItem>

            <GridItem
              colSpan={2}
              display={acquiMode != "Regular" ? "none" : ""}
            >
              <FormControl>
                <FormLabel color={"blackAlpha.600"}>ORS #</FormLabel>
                <Input value={ors} onChange={(e) => setors(e.target.value)} />
              </FormControl>
            </GridItem>

            <GridItem
              colSpan={2}
              display={acquiMode != "Regular" ? "none" : ""}
            >
              <FormControl color={"blackAlpha.600"}>
                <FormLabel>PO Conformed</FormLabel>
                <Input
                  type="date"
                  value={Conformed}
                  onChange={(e) => setConformed(e.target.value)}
                />
              </FormControl>
            </GridItem>

            <GridItem
              colSpan={2}
              display={acquiMode != "Regular" ? "none" : ""}
            >
              <FormControl color={"blackAlpha.600"}>
                <FormLabel>Invoice Record</FormLabel>
                <Input
                  type="date"
                  value={InvoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </FormControl>
            </GridItem>

            <GridItem
              colSpan={2}
              display={acquiMode != "Regular" ? "none" : ""}
            >
              <FormControl color={"blackAlpha.600"}>
                <FormLabel>IAR #</FormLabel>
                <Input value={IAR} onChange={(e) => setIAR(e.target.value)} />
              </FormControl>
            </GridItem>

            <GridItem
              colSpan={2}
              display={acquiMode != "Donation" ? "none" : ""}
            >
              <FormControl>
                <FormLabel color={"blackAlpha.600"}>DRF #</FormLabel>
                <Input value={DRF} onChange={(e) => setDRF(e.target.value)} />
              </FormControl>
            </GridItem>

            <GridItem
              colSpan={2}
              display={acquiMode != "Donation" ? "none" : ""}
            >
              <FormControl color={"blackAlpha.600"}>
                <FormLabel>DRF Date</FormLabel>
                <Input
                  type="date"
                  value={DRFDate}
                  onChange={(e) => setDRFDate(e.target.value)}
                />
              </FormControl>
            </GridItem>

            <GridItem
              colSpan={2}
              display={acquiMode != "Donation" ? "none" : ""}
            >
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
