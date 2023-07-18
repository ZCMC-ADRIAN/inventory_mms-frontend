import React, {useState, useContext} from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { HiEye } from "react-icons/hi";
import PeripheralsContainer from "./PeripheralsContainer";
import AttachPeripheral from "./AttachPeripheral";

const Drawers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState();

  const handleClick = () => {
    onOpen();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        mt={4}
        bgColor={"blue.300"}
        fontSize={20}
        color={"white"}
        _hover={{
          bg: "blue.500",
          boxShadow: "lg",
          transform: "scale(1.1,1.1)",
          transition: "0.3s",
        }}
      >
        <HiEye />
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerCloseButton /> */}
          <DrawerBody>
            <PeripheralsContainer setId={setId}/>
            <AttachPeripheral id={id} setId={setId}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Drawers;
