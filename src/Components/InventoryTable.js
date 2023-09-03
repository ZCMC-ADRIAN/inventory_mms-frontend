import { useTable, usePagination } from "react-table";
import InventoryModal from "./InventoryModal";
import { useClickOutside } from "./useClickOutside";
import { HiSearch } from "react-icons/hi";
import { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ItemModal from "./ItemModal";
import "./Table.css";
import localApi from "../API/Api";
import { HashLoader } from "react-spinners";
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
  Center
} from "@chakra-ui/react";

import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";

const InventoryTable = ({ data, columns, child, children }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tryin = new useDisclosure();
  const [itemId, setItemId] = useState([]);
  const [item, setItem] = useState([]);
  const [details, setDetails] = useState([]);
  const [header, setHeader] = useState([]);

  console.log(details)

  const fetchHeader = async () => {
    const result = await localApi.get("header", {
      params: { header: details },
    });
    setHeader(result.data);
  };

  useEffect(() => {
    fetchHeader();
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

  return (
    <Box w={"100%"} bg={"white"} padding={"30px"}>
      {children}
      <Box w={"100%"}>
        <Flex flexDirection={["column", "column", "row", "row"]}>
          <Box w={"100%"}>
            <Flex justifyContent={"space-between"} alignItems={"end"}>
              <Heading paddingLeft={"25px"} size="lg" color={"#2583CF"}>
                INVENTORY
              </Heading>
              {child !== null ? child : null}
              <Select
                w={32}
                mt={5}
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
              <div className="spinner">
                <HashLoader color="#71bfff" size={40} />
              </div>
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
  );
};

export default InventoryTable;
