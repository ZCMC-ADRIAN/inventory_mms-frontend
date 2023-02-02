import React, { useEffect, useState, useMemo } from "react";
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

const In = ({ setTab, users }) => {
  const toast = useToast();

  const [desc, setDesc] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [searchTerm, setSearchterm] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetchTableData();
  }, [searchTerm]);

  const [tableData, setTableData] = useState([]);

  const fetchTableData = async (value) => {
    const result = await api.get(`/itemtable`, {
      params: {
        q: value ? value : "",
      },
    });
    setTableData(result.data);
  };

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

  const [typeData, setTypeData] = useState();
  const [typeSelect, setTypeSelect] = useState();
  const [typeValue, setTypeValue] = useState();
  const fetchtypes = async (value) => {
    const result = await api.get(`/type`, {
      params: {
        q: value,
      },
    });
    setTypeData(result.data);
  };

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
                              fetchitem(e.target.value);
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
            <GridItem colSpan={4}>
              <SearchSel
                name={"Article"} // form label
                data={typeData} // data fetched from db
                propertyName={"type_name"} //property name to display to the select
                fetchdat={fetchtypes} //async function for fetch the data
                setSelect={setTypeSelect} //Select
                isSelect={typeSelect} //is Selected
                setValue={setTypeValue} //set value for viewing in select input
                valueD={typeValue} //value
              />
            </GridItem>
          </SimpleGrid>
        </CustomTable>
      </div>
    </>
  );
};

export default In;
