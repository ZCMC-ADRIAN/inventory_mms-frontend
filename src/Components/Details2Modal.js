import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import localApi from "../API/Api";
import {
  SimpleGrid,
  GridItem,
  Box,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Grid,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalOverlay,
  Button,
} from "@chakra-ui/react";

import SearchSel from "./searchableSelect/searchSel";
import DataContext from "../Context/Context";

const Details2Modal = ({ isOpen, onClose }) => {
  const {
    locDatas,
    fetchLoc,
    setSelectedLoc,
    selectedLoc,
    setLocValue,
    locValue,
    assocDatas,
    fetchAssoc,
    setSelectedAssoc,
    selectedAssoc,
    setassocValue,
    assocValue,
    condDatas,
    fetchcond,
    setSelectedCond,
    selectedCond,
    setConItem,
    condItem,
    setdeliveryD,
    deliveryD,
    setpropertyno,
    propertyno,
    setserial,
    serial,
    setRemarks,
    remarks,
  } = useContext(DataContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        localApi
          .post("edit-location", {
            location: locValue,
            assoc: assocValue,
            condition: condItem,
            delivery: deliveryD,
            property: propertyno,
            serial: serial,
            remarks: remarks,
          })
          .then(function (response) {
            if (response.data.status === 1) {
              Swal.fire("Saved!", "", "success");
            }
          });
      }
    });
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent p={5}>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid columns={2} columnGap={6} rowGap={6} mt={7}>
                <GridItem colSpan={1}>
                  <Box>
                    <SearchSel
                      name={"Locations"}
                      data={locDatas}
                      propertyName={"location_name"}
                      fetchdat={fetchLoc}
                      setSelect={setSelectedLoc}
                      isSelect={selectedLoc}
                      setValue={setLocValue}
                      valueD={locValue}
                    />
                  </Box>
                </GridItem>

                <GridItem colSpan={1}>
                  <Box>
                    <SearchSel
                      name={"Associate"}
                      data={assocDatas}
                      propertyName={"person_name"}
                      fetchdat={fetchAssoc}
                      setSelect={setSelectedAssoc}
                      isSelect={selectedAssoc}
                      setValue={setassocValue}
                      valueD={assocValue}
                    />
                  </Box>
                </GridItem>

                <GridItem colSpan={1}>
                  <Box>
                    <SearchSel
                      name={"Condition"}
                      data={condDatas}
                      propertyName={"conditions_name"}
                      fetchdat={fetchcond}
                      setSelect={setSelectedCond}
                      isSelect={selectedCond}
                      setValue={setConItem}
                      valueD={condItem}
                    />
                  </Box>
                </GridItem>

                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>Delivery Date</FormLabel>
                    <Input
                      onChange={(e) => {
                        setdeliveryD(e.target.value);
                      }}
                      type="date"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>Property No.</FormLabel>
                    <Input
                      onClick={() => {}}
                      onChange={(e) => {
                        setpropertyno(e.target.value);
                      }}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>Serial</FormLabel>
                    <Input
                      onClick={() => {}}
                      onChange={(e) => {
                        setserial(e.target.value);
                      }}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Remarks</FormLabel>
                    <Textarea
                      onClick={() => {}}
                      onChange={(e) => {
                        setRemarks(e.target.value);
                      }}
                    />
                  </FormControl>
                </GridItem>
              </SimpleGrid>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                bg="blue.300"
                color="white"
                _hover={{ bg: "blue.400" }}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default Details2Modal;
