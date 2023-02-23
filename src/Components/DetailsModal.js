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
} from "@chakra-ui/react";
import { AiFillTags } from "react-icons/ai";
import { FaHashtag, FaUser, FaBox, FaHandHolding } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import {
  BsStack,
  BsQuestionSquareFill,
  BsCalendar2DateFill,
} from "react-icons/bs";
import {
  MdBrandingWatermark,
  MdArticle,
  MdClass,
  MdModelTraining,
} from "react-icons/md";

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
                <Badge colorScheme="blue" whiteSpace='pre-line'>{data.desc}</Badge>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody p={10}>
                <SimpleGrid columns={4} spacing={10}>
                  <GridItem colSpan={2}>
                    <Flex mt={2}>
                      <Text mt={1} fontSize={"17px"} color="#2583CF" mr={3}>
                        <ImLocation2 />
                      </Text>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        LOCATION:
                      </Text>
                      <Text>{data.location_name}</Text>
                    </Flex>

                    <Flex mt={2}>
                      <Text mt={1} fontSize={"17px"} color="#2583CF" mr={3}>
                        <FaUser />
                      </Text>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        ASSIGNED PERSON:
                      </Text>
                      <Text>{data.person_name}</Text>
                    </Flex>

                    <Flex mt={2}>
                      <Text mt={1} fontSize={"16px"} color="#2583CF" mr={3}>
                        <FaBox />
                      </Text>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        UNIT:
                      </Text>
                      <Text>{data.unit}</Text>
                    </Flex>

                    <Flex mt={2}>
                      <Text mt={1} fontSize={"17px"} color="#2583CF" mr={3}>
                        <BsStack />
                      </Text>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        QUANTITY:
                      </Text>
                      <Text>{data.qty}</Text>
                    </Flex>

                    <Flex mt={2}>
                      <Text
                        fontSize={"17px"}
                        fontWeight="bold"
                        color="#2583CF"
                        mr={3}
                      >
                        ₱
                      </Text>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        UNIT VALUE:
                      </Text>
                      <Text>{data.cost}</Text>
                    </Flex>

                    <Flex mt={2}>
                      <Text
                        fontSize={"17px"}
                        fontWeight="bold"
                        color="#2583CF"
                        mr={3}
                      >
                        ₱
                      </Text>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        TOTAL VALUE:
                      </Text>
                      <Text>{data.total_cost}</Text>
                    </Flex>
                  </GridItem>

                  <GridItem colSpan={2}>
                    <Flex>
                      <Text mt={1} fontSize={"17px"} color="#2583CF" mr={3}>
                        <MdBrandingWatermark />
                      </Text>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        BRAND:
                      </Text>
                      <Text>{data.brand_name}</Text>
                    </Flex>

                    <Flex mt={2}>
                      <Text mt={1} fontSize={"17px"} color="#2583CF" mr={3}>
                        <MdArticle />
                      </Text>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        ARTICLE:
                      </Text>
                      <Text>{data.article}</Text>
                    </Flex>

                    <Flex mt={2}>
                      <Text mt={1} fontSize={"17px"} color="#2583CF" mr={3}>
                        <MdClass />
                      </Text>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        TYPE:
                      </Text>
                      <Text>{data.type_name}</Text>
                    </Flex>

                    <Flex mt={2}>
                      <Text mt={1} fontSize={"17px"} color="#2583CF" mr={3}>
                        <BsQuestionSquareFill />
                      </Text>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        STATUS:
                      </Text>
                      <Text>{data.status_name}</Text>
                    </Flex>

                    <Flex mt={2}>
                      <Text mt={1} fontSize={"17px"} color="#2583CF" mr={3}>
                        <MdModelTraining />
                      </Text>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        MODEL:
                      </Text>
                      <Text>{data.model}</Text>
                    </Flex>

                    <Flex mt={2}>
                      <Text mt={1} fontSize={"17px"} color="#2583CF" mr={3}>
                        <BsCalendar2DateFill />
                      </Text>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        WARRANTY:
                      </Text>
                      <Text>{data.warranty}</Text>
                    </Flex>

                    <Flex mt={2}>
                      <Text mt={1} fontSize={"17px"} color="#2583CF" mr={3}>
                        <BsCalendar2DateFill />
                      </Text>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        ACQUISITION DATE:
                      </Text>
                      <Text>{data.acquisition_date}</Text>
                    </Flex>

                    <Flex mt={2}>
                      <Text mt={1} fontSize={"17px"} color="#2583CF" mr={3}>
                        <FaHandHolding />
                      </Text>
                      <Text mr={3} fontWeight={600} color="gray.500">
                        ACQUISITION MODE:
                      </Text>
                      <Text>{data.fundSource}</Text>
                    </Flex>
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
