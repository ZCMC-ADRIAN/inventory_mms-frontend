import { useTable, usePagination } from "react-table";
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
  Button,
  TableContainer,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { HashLoader } from "react-spinners";

import "./Table.css";

import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
import { FaClipboardList } from "react-icons/fa";

import { AiFillEdit } from "react-icons/ai";

import { Children, useContext, useEffect, useState } from "react";
import { VerticallyCenter } from "./inputModal";
import EditModal from "./EditModal";
import DataContext from "../Context/Context";

const CustomTable = ({ title, columns, data, child, children }) => {
  const { fetchItem, setInv } = useContext(DataContext);
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const editModal = new useDisclosure();
  const [id, setid] = useState(null);
  const [itemId, setItemId] = useState([]);
  const [tabStatus, setTabStatus] = useState("none");

  const CustomBtnTheme = {
    backgroundColor: "#2583CF",
    borderRadius: "52px",
    fontSize: "20px",
  };

  return (
    <Box bg={"white"} padding={"20px"}>
      {children}
      <VerticallyCenter
        tabStatus={tabStatus}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        id={id}
      />

      <EditModal
        isOpen={editModal.isOpen}
        onOpen={editModal.onOpen}
        onClose={editModal.onClose}
        itemId={itemId}
      />
      
      <Box w={"100%"}>
        <Flex flexDirection={["column", "column", "row", "row"]}>
          <Box w={"100%"}>
            <Flex justifyContent={"space-between"} alignItems={"end"}>
              <Heading paddingLeft={"25px"} size="lg" color={"#2583CF"}>
                {title}
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
                  <Tr className="td" {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Td {...cell.getCellProps()} whiteSpace="pre-line">
                          {cell.column.id === "action" ? (
                            <Flex columnGap={2}>
                              <Button
                                _hover={{
                                  bg: "#BEEFDA",
                                  boxShadow: "lg",
                                  transform: "scale(1.2,1.2)",
                                  transition: "0.3s",
                                }}
                                onClick={() => {
                                  onOpen();
                                  fetchItem(row.original.Pk_itemId);
                                  setInv(true);
                                }}
                              >
                                <FaClipboardList color="teal" />
                              </Button>

                              <Button
                                _hover={{
                                  bg: "lightgray",
                                  boxShadow: "lg",
                                  transform: "scale(1.2,1.2)",
                                  transition: "0.3s",
                                }}
                                onClick={() => {
                                  setItemId(row.original.Pk_itemId)
                                  editModal.onOpen(row.original.Pk_itemId);
                                }}
                              >
                                <AiFillEdit color="grey" />
                              </Button>
                            </Flex>
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

export default CustomTable;
