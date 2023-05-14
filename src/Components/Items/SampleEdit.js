import React, { useEffect, useState } from "react";
import localApi from "../../API/Api";
import Details2Modal from "../Details2Modal";
import Swal from "sweetalert2";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  InputLeftAddon,
  InputGroup,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

function EditableField({ value, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleValueChange = (e) => {
    setTempValue(e.target.value);
  };

  const handleBlur = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <Select
          value={tempValue}
          onChange={handleValueChange}
          onBlur={handleBlur}
          autoFocus
        >
          <option>Medical Equipment</option>
          <option>Janitorial Equipment</option>
          <option>Office Equipment</option>
          <option>Furniture</option>
          <option>IT</option>
          <option>Other</option>
        </Select>
      ) : (
        <span onClick={() => setIsEditing(true)}>{value}</span>
      )}
    </>
  );
}
function EditModal({ isOpen, onClose, itemId }) {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");

  console.log(category)

  const fetchData = async () => {
    let responseData = await localApi.get("edit-details", {
      params: { itemId: itemId },
    });
    setData(responseData.data);
  };

  useEffect(() => {
    fetchData();
    // fetchEdit();
  }, [itemId]);

  const handleCategoryChange = (newCategory) => {
    const newItems = [...data];
    newItems.itemCateg_name = newCategory;
    setData(newItems);
  };
  
  const handleValueChange = (index, value) => {
    const newData = [...data];
    newData[index].itemCateg_name = value;
    setData(newData);
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <form>
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              {data.map((det, index) => {
                return (
                  <SimpleGrid columns={6} columnGap={4} rowGap={6} p={3} mt={7}>
                    <GridItem colSpan={2}>
                      <FormControl>
                        <FormLabel>Category</FormLabel>
                        {det && (
                          <EditableField value={det.itemCateg_name} onValueChange={(value) => handleValueChange(index, value)} />
                        )}
                      </FormControl>
                    </GridItem>
                  </SimpleGrid>
                )
              })}
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
}

export default EditModal;
