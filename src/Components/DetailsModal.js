import React, { useEffect, useState } from 'react'
import localApi from '../API/Api'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Flex,
    Container
} from '@chakra-ui/react'
import { ImPriceTags, ImLocation } from "react-icons/im";
import { HiHashtag } from "react-icons/hi";
import { MdBrandingWatermark, MdPerson, MdLocationOn } from "react-icons/md";
import { RiInboxArchiveFill, RiStackFill } from "react-icons/ri";
import { BiUnite } from "react-icons/bi";

const DetailsModal = ({ isOpen, onClose, details }) => {
    const [data, setData] = useState([]);

    const fetchDetails = async () => {
        const result = await localApi.get('details', {
            params: {
                id: details
            },
        });
        setData(result.data);
    };

    useEffect(() => {
        fetchDetails();
    }, [details]);

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} size='lg'>
                <ModalOverlay />
                {data.map((item) => {
                    return (
                        <ModalContent>
                            <ModalHeader bg='blue.300' borderRadius={5} fontSize={16} color='white'>{item.desc}</ModalHeader>
                            <ModalCloseButton bg='white' _hover={{ bg: 'gray.300' }} />
                            <ModalBody p={8}>
                                <Flex>
                                    <Container mr={2}>
                                        <Flex>
                                            <Text mt={1}><ImPriceTags color='#63b3ed' /></Text>
                                            <Text ml={2} mr={2} className='label'>Property No: </Text>
                                            <Text fontWeight={600} color='black'>{item.property_no}</Text>
                                        </Flex>
                                        <Flex mt={2}>
                                            <Text mt={1}><HiHashtag color='#63b3ed' /></Text>
                                            <Text ml={2} mr={2} className='label'>Serial No: </Text>
                                            <Text fontWeight={600} color='black'>{item.serial}</Text>
                                        </Flex>
                                        <Flex mt={2}>
                                            <Text mt={1}><MdBrandingWatermark color='#63b3ed' /></Text>
                                            <Text ml={2} mr={2} className='label'>Model: </Text>
                                            <Text fontWeight={600} color='black'>{item.model}</Text>
                                        </Flex>
                                        <Flex mt={2}>
                                            <Text mt={1}><RiInboxArchiveFill color='#63b3ed' /></Text>
                                            <Text ml={2} mr={2} className='label'>Acquisition Mode: </Text>
                                            <Text fontWeight={600} color='black'>{item.fundSource}</Text>
                                        </Flex>
                                        <Flex mt={2}>
                                            <Text mt={1}><MdPerson color='#63b3ed' /></Text>
                                            <Text ml={2} mr={2} className='label'>Supplier/Donor: </Text>
                                            <Text fontWeight={600} color='black'>{item.supplier}</Text>
                                        </Flex>
                                        <Flex mt={2}>
                                            <Text mt={1}><MdLocationOn color='#63b3ed' /></Text>
                                            <Text ml={2} mr={2} className='label'>Location: </Text>
                                            <Text fontWeight={600} color='black'>{item.location_name}</Text>
                                        </Flex>
                                        <Flex mt={2}>
                                            <Text mt={1}><MdPerson color='#63b3ed' /></Text>
                                            <Text ml={2} mr={2} className='label'>Assigned Person: </Text>
                                            <Text fontWeight={600} color='black'>{item.person_name}</Text>
                                        </Flex>
                                        <Flex mt={2}>
                                            <Text mt={1}><BiUnite color='#63b3ed' /></Text>
                                            <Text ml={2} mr={2} className='label'>Unit: </Text>
                                            <Text fontWeight={600} color='black'>{item.unit}</Text>
                                        </Flex>
                                        <Flex mt={2}>
                                            <Text mt={1}><RiStackFill color='#63b3ed' /></Text>
                                            <Text ml={2} mr={2} className='label'>Quantity: </Text>
                                            <Text fontWeight={600} color='black'>{item.Quantity}</Text>
                                        </Flex>
                                        <Flex mt={2}>
                                            <Text color='#63b3ed' fontWeight='bold'>₱</Text>
                                            <Text ml={2} mr={2} className='label'>Unit Value: </Text>
                                            <Text fontWeight={600} color='black'>{item.costs}</Text>
                                        </Flex>
                                        <Flex mt={2}>
                                            <Text color='#63b3ed' fontWeight='bold'>₱</Text>
                                            <Text ml={2} mr={2} className='label'>Total Value: </Text>
                                            <Text fontWeight={600} color='black'>{item.total_value}</Text>
                                        </Flex>
                                    </Container>
                                    {/* <Container>
                                        <Flex>
                                            <Text mt={1}><MdPerson color='#63b3ed' /></Text>
                                            <Text ml={2} mr={2} className='label'>Assigned Person: </Text>
                                            <Text fontWeight={600} color='black'>{item.person_name}</Text>
                                        </Flex>
                                    </Container> */}
                                </Flex>
                            </ModalBody>
                        </ModalContent>
                    )
                })}
            </Modal>
        </div>
    )
}

export default DetailsModal