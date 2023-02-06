import React, { useState } from "react";
import { FormControl, FormLabel, Select, Container } from "@chakra-ui/react";
import Equipment from "../Components/Items/Equipment";
import Janitorial from "../Components/Items/Janitorial";
import Medical from "../Components/Items/Medical";
import Office from "../Components/Items/Office";
import Sample from "./Items/Sample";
const CreateItem = ({setTab}) => {
  const [selected, setSelected] = useState("equipment");
  return (
    <>
      {" "}
      <Container
        maxW="container.lg"
        w="full"
        h="full"
        py={{ base: "4", md: "4" }}
        px={{ base: "4", sm: "8" }}
      >
        {selected === "equipment" && <Equipment setTab={setTab}/>}
        {selected === "janitorial" && <Sample />}
        {selected === "medical" && <Medical />}
        {selected === "office" && <Office />}
      </Container>
    </>
  );
};

export default CreateItem;
