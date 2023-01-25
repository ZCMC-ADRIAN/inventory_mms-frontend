import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react'

const InventoryModal = ({isOpen, onClose}) => {

  return (
    <>
      <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose} size='2xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'sm'} color='#2583CF'>Speaker System Stereo Megaoke</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            Details
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InventoryModal;
