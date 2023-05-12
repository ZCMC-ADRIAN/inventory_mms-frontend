import { useTable, usePagination } from "react-table";
import InventoryModal from "./InventoryModal";
import { useClickOutside } from "./useClickOutside";
import { HiSearch } from "react-icons/hi";
import localApi from "../API/Api";
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

import "./Table.css";

import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CloseIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemModal from "./ItemModal";

const InventoryTable = ({ title, columns, child }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tryin = new useDisclosure();
  const [itemId, setItemId] = useState([]);
  const [item, setItem] = useState([]);
  const [details, setDetails] = useState([]);
  const [header, setHeader] = useState([]);

  const [location, setLocation] = useState("");
  const [searchTerm, setSearchterm] = useState([]);
  const [term, setTerm] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [data, setTableData] = useState([]);
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

  const fetchTableData = async (value) => {
    const result = await localApi.get(`data-table`, {
      params: {
        q: value ? value : ""
      },
    });
    setTableData(result.data);
  };

  const fetchHeader = async () => {
    const result = await localApi.get("header", {
      params: { header: details },
    });
    setHeader(result.data);
  };

  useEffect(() => {
    fetchHeader();
    fetchlocation();
    fetchTableData();
  }, [item, details]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const CustomBtnTheme = {
    backgroundColor: "#2583CF",
    borderRadius: "52px",
    fontSize: "20px",
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

  return (
    <div className="table-container">
      <Box w={"100%"} bg={"white"} padding={"30px"}>
        <Box w={"100%"}>
          <Flex
            justifyContent={"space-between"}
            flexDirection={["column", "column", "row", "row"]}
          >
            <Flex alignItems={"center"} columnGap={5}>
              <Heading size="lg" color={"#2583CF"}>
                {title}
              </Heading>
            </Flex>
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
                <FormControl mt={5}>
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
              <Button
                w={12}
                mt={5}
                display={close}
                bg="blue.100"
                _hover={{ bg: "blue.200" }}
                onClick={() => {
                  setLocation([]);
                  fetchTableData([]);
                  setClose("none");
                  setLocation("Search here....");
                }}
              >
                <CloseIcon fontSize={12} color="gray" />
              </Button>
            </SimpleGrid>

            <Box>
              <Flex columnGap={3} justifyContent={"end"}>
                <Menu>
                  <MenuButton
                    fontSize={13}
                    bg="green.200"
                    mt={"75px"}
                    _expanded={{ bg: "green.300" }}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    Generate
                  </MenuButton>
                  <MenuList>
                    <Menu>
                      <MenuButton
                        ml={3.5}
                        rightIcon={<ChevronDownIcon />}
                      >
                        Report
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => navigate("/report/area")}>
                          Area
                        </MenuItem>
                        <MenuItem onClick={() => navigate("/report/person")}>
                          Assigned Person
                        </MenuItem>
                        <MenuItem onClick={() => navigate("/report/not-found")}>
                          Not Found Items
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    <MenuItem onClick={() => navigate("/mass-print")}>
                      QR Code
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/tag")}>
                      Property Tag
                    </MenuItem>
                  </MenuList>
                </Menu>

                {child !== null ? child : null}
                <Select
                  w={32}
                  mt={20}
                  bg={"white"}
                  size={"sm"}
                  value={pageSize}
                  focusBorderColor={"gray.400"}
                  borderRadius={5}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option fontSize={14} key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Box>
          </Flex>
        </Box>

        <TableContainer w={"100%"}>
          <Table
            mt={5}
            bg={"white"}
            maxWidth={"100%"}
            className={"table"}
            variant="unstyled"
            overflow="hidden"
            {...getTableProps()}
          >
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr
                  h={"5rem"}
                  fontSize={15}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <Th
                      bg={"white"}
                      color={"gray.600"}
                      fontSize={15}
                      border={"white"}
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.length >= 1 ? (
                page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <Tr
                      onClick={() => {
                        tryin.onOpen(row.original.Pk_inventoryId);
                        setDetails(row.original.desc);
                      }}
                      className="td"
                      {...row.getRowProps()}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <Td {...cell.getCellProps()} whiteSpace="pre-line">
                            {cell.column.id === "action" ? (
                              <Flex columnGap={2}></Flex>
                            ) : cell.column.Header === "No" ? (
                              <Text fontWeight={"bold"} color={"green.600"}>
                                {pageIndex * 10 + ++i}
                              </Text>
                            ) : (
                              cell.render("Cell")
                            )}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })
              ) : (
                <Text>NO RECORD</Text>
              )}
            </Tbody>
          </Table>
        </TableContainer>

        <InventoryModal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          itemId={itemId}
          item={item}
        />
        <ItemModal
          isOpen={tryin.isOpen}
          onClose={tryin.onClose}
          onOpen={tryin.onOpen}
          header={header}
          details={details}
        />

        {page.length >= 1 ? (
          <Flex justifyContent={"end"} mt={5}>
            <div id="btnleft">
              <Tooltip label="First Page">
                <IconButton
                  style={CustomBtnTheme}
                  onClick={() => gotoPage(0)}
                  isDisabled={!canPreviousPage}
                  icon={<ArrowLeftIcon h={3} w={3} color="white" />}
                  mr={4}
                />
              </Tooltip>
              <Tooltip label="Previous Page">
                <IconButton
                  style={CustomBtnTheme}
                  className="paginationbtn"
                  onClick={previousPage}
                  isDisabled={!canPreviousPage}
                  icon={<ChevronLeftIcon h={6} w={6} color="white" />}
                />
              </Tooltip>
            </div>

            <Box bg={"white.200"} p={2} borderRadius={5}>
              <Flex>
                <Box fontSize={13}>Page</Box>
                <Text fontWeight="bold" fontSize={13} ml={2} as="span">
                  {pageIndex + 1}
                </Text>
                <Box ml={2} fontSize={13} w={"2rem"}>
                  of
                </Box>

                <Text fontSize={13} fontWeight="bold" as="span">
                  {pageOptions.length}
                </Text>
              </Flex>
            </Box>

            <div id="btnright">
              <Tooltip label="Next Page">
                <IconButton
                  style={CustomBtnTheme}
                  className="paginationbtn"
                  onClick={nextPage}
                  isDisabled={!canNextPage}
                  icon={<ChevronRightIcon h={6} w={6} color="white" />}
                />
              </Tooltip>
              <Tooltip label="Last Page">
                <IconButton
                  style={CustomBtnTheme}
                  className="paginationbtn"
                  onClick={() => gotoPage(pageCount - 1)}
                  isDisabled={!canNextPage}
                  icon={<ArrowRightIcon h={3} w={3} color="white" />}
                  ml={4}
                />
              </Tooltip>
            </div>
          </Flex>
        ) : (
          ""
        )}
      </Box>
    </div>
  );
};

export default InventoryTable;
