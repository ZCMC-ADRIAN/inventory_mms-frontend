import React, { useState, useEffect, useMemo, useContext } from "react";
import { useTable, usePagination } from "react-table";
import { useClickOutside } from "./useClickOutside";
import localApi from "../API/Api";
import DataContext from "../Context/Context";
import { HiSearch } from "react-icons/hi";
import "./Table.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  Flex,
  Center,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  TableContainer,
  Tooltip,
  IconButton,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  GridItem,
  Button
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CloseIcon
} from "@chakra-ui/icons";

const InventoryModal = ({ isOpen, onClose, child, item }) => {
  const [location, setLocation] = useState('');
  const [searchTerm, setSearchterm] = useState([]);
  const [term, setTerm] = useState("");
  const [desc, setDesc] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [data, setTableData] = useState([]);
  const [close, setClose] = useState('none');

  const fetchlocation = async (value) => {
    const result = await localApi.get(`location-name`, {
      params: {
        q: value,
      },
    });
    setSearchterm(result.data);
  };

  const fetchTableData = async (value) => {
    const result = await localApi.get(`item-list`, {
      params: {
        q: value ? value : "",
        desc: item
      },
    });
    setTableData(result.data);
  };

  useEffect(() => {
    fetchlocation();
    fetchTableData();
  }, [item]);

  const columns = useMemo(
    () => [
      {
        Header: "No",
        accessor: "Pk_inventoryId",
      },
      {
        Header: "Item Description",
        accessor: "desc",
      },
      {
        Header: "Location",
        accessor: "location_name",
      },
      {
        Header: "Quantity",
        accessor: "Quantity"
      }
    ],
    []
  );

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

  const [dropdown, setDropdown] = useState(false);

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
    <>
      <Modal
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onClose={onClose}
        size="full"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton bg='blue.400' />
          <ModalBody className="item-modal">
            <Center>
              <Box w={"80%"} bg={"white"} padding={"30px"} mt={10}>
                <Box w={"100%"}>
                  <Flex
                    justifyContent={"space-between"}
                    flexDirection={["column", "column", "row", "row"]}
                    mt={7}
                  >
                    <Flex alignItems={"center"} columnGap={5}>
                      <Heading size="lg" color={"#2583CF"}>
                        Items
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
                      <GridItem colSpan={2}>
                        <FormControl>
                          <FormLabel>Location</FormLabel>
                          <div
                            ref={domNod}
                            onClick={() => {
                              setDropdown(!dropdown);
                              fetchlocation();
                              setClose('inline')
                            }}
                            className="custom-select"
                          >
                            <p>{location === "" ? "- Select Location -" : location}</p>
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
                                          setDesc(item.location_name);
                                          setDropdown(false);
                                          setLocation(item.location_name);
                                          fetchTableData(item.location_name);
                                        }}
                                        key={index}
                                      >
                                        {item.location_name}
                                      </p>
                                    </>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </FormControl>
                      </GridItem>
                      <Button w={12} mt={8} display={close} bg='blue.100' _hover={{ bg: 'blue.200' }} onClick={() => { setLocation([]); fetchTableData([]); setClose('none'); setLocation("- Select Location -") }}>
                        <CloseIcon fontSize={12} color='gray' />
                      </Button>
                    </SimpleGrid>
                    <Box>
                      <Flex columnGap={3} justifyContent={"end"}>
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
                            <Tr className="td" {...row.getRowProps()}>
                              {row.cells.map((cell) => {
                                return (
                                  <Td {...cell.getCellProps()} whiteSpace='pre-line'>
                                    {cell.column.id === "action" ? (
                                      <Flex columnGap={1}>
                                        {/* <Button
                                        _hover={{
                                          bg: "#FCD299",
                                          boxShadow: "lg",
                                          transform: "scale(1.2,1.2)",
                                          transition: "0.3s",
                                        }}
                                        onClick={() => { onOpen(cell.row.values.Pk_inventoryId); setItemId(cell.row.values.Pk_inventoryId) }}
                                      >
                                        <AiOutlineFolderView color="orange" />
                                      </Button> */}
                                      </Flex>
                                    ) : cell.column.id === "dept" ? (
                                      <Text
                                        fontWeight={"bold"}
                                        textTransform={"uppercase"}
                                        color={"green.600"}
                                      >
                                        {cell.row.values.dept_Name}
                                      </Text>
                                    ) : cell.column.Header === "No" ? (
                                      <Text fontWeight={"bold"} color={"green.600"}>
                                        {pageIndex * 10 + ++i}
                                      </Text>
                                    ) : cell.column.Header === "users" ? (
                                      <>{cell.row.values.user}</>
                                    ) : cell.column.id === "total" ? (
                                      <Text fontWeight={"bold"}>
                                        ₱ {cell.row.values.total}
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

                {/* <InventoryModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} itemId={itemId} /> */}

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
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InventoryModal;
