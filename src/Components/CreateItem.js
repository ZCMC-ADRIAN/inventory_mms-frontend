import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  Container,
  Box,
  Text,
  SimpleGrid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import Equipment from "../Components/Items/Equipment";
import Drawers from "./Drawer";
const CreateItem = ({ setTab }) => {
  const [selected, setSelected] = useState("equipment");
  return (
    <>
      {" "}
      <Flex>
        <Container
          maxW="container.lg"
          w="full"
          h="full"
          py={{ base: "4", md: "4" }}
          px={{ base: "4", sm: "2" }}
        >
          {selected === "equipment" && <Equipment setTab={setTab} />}
        </Container>
        {/* <Drawers /> */}
      </Flex>
    </>
  );
};

export default CreateItem;
