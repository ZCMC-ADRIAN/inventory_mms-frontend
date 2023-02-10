import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Container
} from '@chakra-ui/react'

const DetailsModal = ({ isOpen, onClose }) => {
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg='blue.300' borderRadius={5} fontSize={16} color='white'>Hard Drive External</ModalHeader>
                    <ModalCloseButton bg='white' _hover={{ bg: 'gray.300' }} />
                    <ModalBody>
                        Name: Adrian Agcaoili
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default DetailsModal