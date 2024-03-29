import React, { useEffect, useState, useMemo, useContext } from "react";
import {
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  useToast,
  Divider,
  Textarea,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Icon,
  Container,
  InputLeftAddon,
  Box,
  Flex,
} from "@chakra-ui/react";
import useAuth from "../Hooks/useAuth";
import { HiSearch } from "react-icons/hi";
import { useClickOutside } from "../Components/useClickOutside";
import InItemModal from "./InItemModal";
import api from "../API/Api";
import SearchSel from "./searchableSelect/searchSel";
import CustomTable from "./CustomTable";
import DataContext from "../Context/Context";

const In = ({ setTab, users }) => {
  const { tableData, fetchTableData } = useContext(DataContext);
  const toast = useToast();

  const [desc, setDesc] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [searchTerm, setSearchterm] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetchTableData();
  }, []);

  // const fetchTableData = async (value) => {
  //   const result = await api.get(`/itemtable`, {
  //     params: {
  //       q: value ? value : "",
  //     },
  //   });
  //   setTableData(result.data);
  // };

  const fetchitem = async (value) => {
    const result = await api.get(`/item`, {
      params: {
        q: value,
      },
    });
    setSearchterm(result.data);
  };

  const [dropdown, setDropdown] = useState(false);

  const domNod = useClickOutside(() => {
    setDropdown(false);
  });

  const columns = useMemo(
    () => [
      {
        Header: "Item name",
        accessor: "item name",
      },
      {
        Header: "Brand",
        accessor: "brand_name",
      },
      {
        Header: "Type",
        accessor: "type_name",
      },
      {
        Header: "Article",
        accessor: "article name",
      },
      { Header: "Variety", accessor: "variety" },
      { Header: "Detail", accessor: "details2" },
      {
        Header: "ACTION",
        accessor: "action",
      },
    ],
    []
  );
  
  const [timeoutId, setTimeoutId] = useState(null);
  const handleSearch = (term) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(
      setTimeout(() => {
        // fetch data from database using the search term
        // fetchdat(term);

        fetchitem(term.target.value);
      }, 500)
    );
  };

  return (
    <>
      <div className="table-container">
        <CustomTable title={"ITEMS"} columns={columns} data={tableData}>
          <SimpleGrid
            columns={6}
            columnGap={3}
            rowGap={6}
            w="full"
            h={"full"}
            p={6}
            flexDirection="column"
          >
            <GridItem colSpan={[6, 3]}>
              <FormControl>
                <FormLabel>Item description</FormLabel>
                <div
                  ref={domNod}
                  onClick={() => {
                    setDropdown(!dropdown);
                    fetchitem();
                  }}
                  className="custom-select"
                >
                  <Flex width={80} justifyContent={"space-between"}>
                    <p width={"100px"}>
                      {itemDesc === "" ? "- Select Item -" : itemDesc}
                    </p>
                  </Flex>

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
                        <Button
                          onClick={() => {
                            setTab("create");
                          }}
                          fontSize="14px"
                          ml={2}
                        >
                          New
                        </Button>
                      </div>

                      {searchTerm?.map((item, index) => {
                        return (
                          <>
                            <p
                              onClick={() => {
                                setDesc(item.property_no);
                                setDropdown(false);
                                setItemDesc(item.property_no);
                                fetchTableData(item.property_no);
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
          </SimpleGrid>
        </CustomTable>
      </div>
    </>
  );
};

export default In;
