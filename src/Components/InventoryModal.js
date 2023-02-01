import React, {useState, useEffect} from "react";
import localApi from "../API/Api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  Flex,
  Badge,
  Center
} from "@chakra-ui/react";
import holder from '../Assets/holder.png';

const InventoryModal = ({ isOpen, onClose, itemId }) => {
  const [details, setDetails] = useState([]);

  const fetchData = async () => {
    let responseDetails = await localApi.get("details",{
      params: {inId : itemId}
    });
    setDetails(responseDetails.data);
  };

  useEffect(() => {
    fetchData();
  }, [itemId]);

  return (
    <>
      <Modal
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"sm"} color="#2583CF">
            Speaker System Stereo Megaoke
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display='flex'>
            <Box bg='blue.100' p={4} w='50%' fontSize={14} mr={5} overflow='scroll' overflowX='hidden'>
              <Flex>
                <Text mr={3} fontWeight='bold'>Brand:</Text>
                {details.map((data)=>{
                  return(
                    <Text>{data.brand_name}</Text>
                  )
                })}
              </Flex>
              <Flex>
                <Text mr={3} fontWeight='bold'>Manufacturer:</Text>
                {details.map((data)=>{
                  return(
                    <Text>{data.manu_name}</Text>
                  )
                })}
              </Flex>
              <Flex>
                <Text mr={3} fontWeight='bold'>Serial No:</Text>
                {details.map((data)=>{
                  return(
                    <Text>{data.serial}</Text>
                  )
                })}
              </Flex>
              <Flex>
                <Text mr={3} fontWeight='bold'>Property No:</Text>
                {details.map((data)=>{
                  return(
                    <Text>{data.property_no}</Text>
                  )
                })}
              </Flex>
              <Flex>
                <Text mr={3} fontWeight='bold'>Country of origin:</Text>
                {details.map((data)=>{
                  return(
                    <Text>{data.country}</Text>
                  )
                })}
              </Flex>
              <Flex>
                <Text mr={3} fontWeight='bold'>Supplier/Donor:</Text>
                {details.map((data)=>{
                  return(
                    <Text>{data.supplier_name}</Text>
                  )
                })}
              </Flex>
              <Flex mb={10}>
                <Text mr={3} fontWeight='bold'>Cost:</Text>
                {details.map((data)=>{
                  return(
                    <Text>₱ {data.costs}</Text>
                  )
                })}
              </Flex>

              <Flex flexDirection='column' mb={2}>
                <Text textAlign='center' mr={3} fontWeight='bold'>Quantity</Text>
                <Box bg='black' p='0.5px'></Box>
              </Flex>
              <Flex>
                <Text mr={3} fontWeight='bold'>Tent 1:</Text>
                <Text>20</Text>
              </Flex>
              <Flex>
                <Text mr={3} fontWeight='bold'>Tent 2:</Text>
                <Text>0</Text>
              </Flex>
              <Flex>
                <Text mr={3} fontWeight='bold'>Tower 1:</Text>
                <Text>34</Text>
              </Flex>
              <Flex>
                <Text mr={3} fontWeight='bold'>Tower 2:</Text>
                <Text>8</Text>
              </Flex>
              <Flex>
                <Text mr={3} fontWeight='bold'>MMS:</Text>
                <Text>11</Text>
              </Flex>
              <Flex>
                <Badge colorScheme='green' mr={3} fontWeight='bold'>Total:</Badge>
                <Badge colorScheme='green'>73</Badge>
              </Flex>
            </Box>
            <Box w={'25rem'} h={'20rem'} bg='gray.100' border='1px' borderColor='gray.300'>
              <Center display='flex' justifyContent='center' alignItems='center'>
                <Text>No Image</Text>
              </Center>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InventoryModal;
