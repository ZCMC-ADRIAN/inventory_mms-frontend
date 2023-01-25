import React from "react";
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
  Flex
} from '@chakra-ui/react'

const InventoryModal = ({isOpen, onClose}) => {

  return (
    <>
      <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'sm'} color='#2583CF'>Speaker System Stereo Megaoke</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex justifyContent='space-evenly'>
              <Text>Brand:</Text>
              <Text>Sharp</Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InventoryModal;
