import { useContext, useEffect, useRef } from "react";
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
} from "@chakra-ui/react";
import SearchSel from "./searchableSelect/searchSel";

export const VerticallyCenter = ({
  title,
  children,
  isOpen,
  onClose,
  postSubmit,
}) => {
  const { itemdetails } = useContext(DataContext);

  const CardDet = ({ property, detail, bg }) => {
    return (
      <Box bg={bg} fontSize={15} color={"blackAlpha.600"} w={"100%"} h={"2em"}>
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



  ////Delivery_date	Quantity	pack_size	loose	Remarks	

  return (
    <>
      <Modal onClose={onClose} size={"full"} isOpen={isOpen} isCentered>
        <ModalContent w={"60%"} minW={"60%"} margin={"100px"}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* {children} */}
            <Flex color={"blackAlpha.600"} h={"70vh"}>
              <Box flex={8} alignSelf={"center"}>
                <Grid alignItems={'center'} templateColumns='repeat(6, 1fr)' gap={6} paddingEnd={5}>
                  <GridItem colSpan={6} w='100%' >
                    <Box >
                      <SearchSel name={"Location"} />
                    </Box>
                  </GridItem>
                  <GridItem colSpan={3} w='100%' >
                    <Box >
                      <SearchSel name={"Condition"} />
                    </Box>
                  </GridItem>
                  <GridItem colSpan={3} w='100%' >
                    <FormControl>
                      <FormLabel >IAR No</FormLabel>
                      <Input
                        onClick={() => {
                          //fetchdat(null);
                          //setVisible(!isVisible);
                        }}
                        //value={ }
                        onChange={(e) => {
                          //setValue(e.target.value);
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormControl>
                      <FormLabel>IAR Date</FormLabel>
                      <Input
                        // value={acquisition}
                        // onChange={(e) => setAcquisition(e.target.value)}
                        type="date"
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormControl>
                      <FormLabel>Delivery Date</FormLabel>
                      <Input
                        // value={acquisition}
                        // onChange={(e) => setAcquisition(e.target.value)}
                        type="date"
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={3} w='100%' >
                    <FormControl>
                      <FormLabel >Quantity</FormLabel>
                      <Input
                        onClick={() => {
                          //fetchdat(null);
                          //setVisible(!isVisible);
                        }}
                        //value={ }
                        onChange={(e) => {
                          //setValue(e.target.value);
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={3} w='100%' >
                    <FormControl>
                      <FormLabel >Pack Size</FormLabel>
                      <Input
                        onClick={() => {
                          //fetchdat(null);
                          //setVisible(!isVisible);
                        }}
                        //value={ }
                        onChange={(e) => {
                          //setValue(e.target.value);
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={3} w='100%' >
                    <FormControl>
                      <FormLabel >Loose</FormLabel>
                      <Input
                        onClick={() => {
                          //fetchdat(null);
                          //setVisible(!isVisible);
                        }}
                        //value={ }
                        onChange={(e) => {
                          //setValue(e.target.value);
                        }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={3} w='100%' >
                    <FormControl>
                      <FormLabel >Remarks</FormLabel>
                      <Input
                        variant='flushed'
                        onClick={() => {
                          //fetchdat(null);
                          //setVisible(!isVisible);
                        }}
                        //value={ }
                        onChange={(e) => {
                          //setValue(e.target.value);
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
                        src="https://media.karousell.com/media/photos/products/2022/5/29/dell_latitude_5520_intel_core__1653831125_b8e7d0fe.jpg"
                        alt="Dan Abramov"
                      ></Image>
                    </Flex>
                  </Box>

                  {
                    itemdetails != null && Object.keys(itemdetails[0]).map((e, i) => <CardDet key={i} bg={i % 2 == 0 && '#f3f7fa'} property={e} detail={itemdetails[0][e]} />)

                  }
                </Stack>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"teal"} onClick={postSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
