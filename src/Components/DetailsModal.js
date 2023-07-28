import React, { useState, useEffect } from "react";
import localApi from "../API/Api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  GridItem,
  Text,
  Flex,
  Badge,
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const DetailsModal = ({ isOpen, onClose, inventoryId }) => {
  const [details, setDetails] = useState([]);

  const fetchDetails = async (value) => {
    const result = await localApi.get("details", {
      params: {
        inventoryId: inventoryId,
      },
    });
    setDetails(result.data);
  };

  useEffect(() => {
    fetchDetails();
  }, [inventoryId]);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        {details.map((data, key) => {
          return (
            <ModalContent key={key}>
              <ModalHeader>
                <Badge colorScheme="blue" whiteSpace="pre-line">
                  {data.desc}
                </Badge>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody p={7}>
                <SimpleGrid columns={4} spacing={10}>
                  <GridItem colSpan={4}>
                    <Flex mt={2}>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        LOCATION:
                      </Text>
                      <Text>{data.location_name}</Text>
                    </Flex>

                    <Flex mt={2}>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        ACCOUNTABILITY OFFICER:
                      </Text>
                      <Text>{data.person_name}</Text>
                    </Flex>

                    <Flex mt={2}>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        UNIT:
                      </Text>
                      <Text>{data.unit}</Text>
                    </Flex>

                    <Flex mt={2}>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        COST:
                      </Text>
                      <Text>₱ {data.cost}</Text>
                    </Flex>
                  </GridItem>

                  <GridItem colSpan={4}>
                    <TableContainer>
                      <Table size="sm">
                        <Thead>
                          <Tr>
                            <Th>Property # (Old)</Th>
                            <Th>Property # (New)</Th>
                            <Th isNumeric>multiply by</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>
                            <Td isNumeric>25.4</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </GridItem>
                </SimpleGrid>
              </ModalBody>
            </ModalContent>
          );
        })}
      </Modal>
    </div>
  );
};

export default DetailsModal;
