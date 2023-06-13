import { useClickOutside } from "./useClickOutside";
import { HiSearch } from "react-icons/hi";
import { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Table.css";
import localApi from "../API/Api";
import InventoryTable from "./InventoryTable";
import DataContext from "../Context/Context";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  Box,
  TableContainer,
  Heading,
  useDisclosure,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  GridItem,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

import {
  CloseIcon,q
} from "@chakra-ui/icons";

const Inventory = () => {
  const { inventoryData, fetchInventoryData } = useContext(DataContext);

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const [location, setLocation] = useState("");
  const [searchTerm, setSearchterm] = useState([]);
  const [term, setTerm] = useState("");
  const [desc, setDesc] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [close, setClose] = useState("none");
  const [dropdown, setDropdown] = useState(false);

  const fetchlocation = async (value) => {
    const result = await localApi.get(`location-name`, {
      params: {
        q: value,
      },
    });
    setSearchterm(result.data);
  };

  const domNod = useClickOutside(() => {
    setDropdown(false);
  });

  const handleSearch = (term) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(
      setTimeout(() => {
        fetchlocation(term.target.value);
      }, 500)
    );
  };

  const column = useMemo(
    () => [
      {
        Header: "No",
      },
      {
        Header: "Item Description",
        accessor: "desc",
      },
      {
        Header: "Quantity",
        accessor: "total_qty",
      },
      {
        Header: "Category",
        accessor: "itemCateg_name"
      },
    ],
    []
  );

  return (
    <div className="table-container">
      <InventoryTable columns={column} data={inventoryData}>
        <SimpleGrid
          columns={6}
          columnGap={3}
          rowGap={6}
          w="full"
          h={"full"}
          p={6}
          flexDirection="column"
        >
          <GridItem colSpan={[6, 2]}>
            <FormControl>
              <div
                ref={domNod}
                onClick={() => {
                  setDropdown(!dropdown);
                  fetchlocation();
                  setClose("inline");
                }}
                className="custom-select"
              >
                <p>{location === "" ? "Search here...." : location}</p>
                {dropdown && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="select-dropdown"
                  >
                    <div className="select-input-container">
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          color="gray.300"
                          fontSize="1.2em"
                          children={<Icon as={HiSearch} />}
                        />
                        <Input
                          background="#fff"
                          value={term}
                          onChange={(e) => {
                            setTerm(e.target.value);
                            handleSearch(e);
                          }}
                          fontSize="14px"
                          placeholder="Search"
                        />
                      </InputGroup>
                    </div>

                    {searchTerm?.map((item, index) => {
                      return (
                        <>
                          <p
                            onClick={() => {
                              setDesc(item.property_no);
                              setDropdown(false);
                              setLocation(item.property_no);
                              fetchInventoryData(item.property_no);
                            }}
                            key={index}
                          >
                            {item.property_no}
                          </p>
                        </>
                      );
                    })}
                  </div>
                )}
              </div>
            </FormControl>
          </GridItem>
          <Button
            w={12}
            display={close}
            bg="blue.100"
            _hover={{ bg: "blue.200" }}
            onClick={() => {
              setLocation([]);
              fetchInventoryData([]);
              setClose("none");
              setLocation("Search here....");
            }}
          >
            <CloseIcon fontSize={12} color="gray" />
          </Button>
        </SimpleGrid>
      </InventoryTable>
    </div>
  );
};

export default Inventory;
