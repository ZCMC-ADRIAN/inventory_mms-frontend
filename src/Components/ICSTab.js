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
                <FormControl>PO No.</FormControl>
                <Input />
              </GridItem>

              <GridItem colSpan={3}>
                <FormControl>BURS</FormControl>
                <Input />
              </GridItem>

              <GridItem colSpan={3}>
                <FormControl>Date 1</FormControl>
                <Input type="date" />
              </GridItem>

              <GridItem colSpan={3}>
                <FormControl>Date 2</FormControl>
                <Input type="date" />
              </GridItem>
            </Grid>
          </Box>
        </Flex>
      </ModalBody>
      <ModalFooter>
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
      </ModalFooter>
    </div>
  );
};

export default ICSTab;
