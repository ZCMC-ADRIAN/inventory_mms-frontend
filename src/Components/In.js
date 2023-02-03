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

  // useEffect(() => {
  //   fetchTableData();
  // }, [searchTerm]);

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
        Header: "Item desc",
        accessor: "item_name",
      },
      {
        Header: "Brand",
        accessor: "brand_name",
      },
      {
        Header: "manufacturer",
        accessor: "manu_name",
      },
      {
        Header: "Type",
        accessor: "type_name",
      },
      {
        Header: "Article",
        accessor: "article_name",
      },
      {
        Header: "Remarks",
        accessor: "remarks",
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
            <GridItem colSpan={2}>
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
                  <p>{itemDesc === "" ? "- Select Item -" : itemDesc}</p>
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
                                setDesc(item.item_name);
                                setDropdown(false);
                                setItemDesc(item.item_name);
                                fetchTableData(item.item_name);
                              }}
                              key={index}
                            >
                              {item.item_name}
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
