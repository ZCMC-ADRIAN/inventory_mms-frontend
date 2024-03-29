import { useTable, usePagination } from "react-table";
import { IoAddCircleOutline } from "react-icons/io5";
import InventoryModal from "./InventoryModal";
import ItemTable from "./ItemTable";
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
  Center,
  Button,
  TableContainer,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import Search from "./Search";

import "./Table.css";

import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";

import { AiOutlineFolderView } from "react-icons/ai";
import { useState, useMemo } from "react";

const InventoryTable = ({
  title,
  columns,
  data,
  fetch,
  search,
  setSearch,
  handleClick,
  child,
}) => {
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemId, setItemId] = useState([]);


  return (
    <Box>
      <Box w={"100%"}>
        <Flex
          justifyContent={"space-between"}
          flexDirection={["column", "column", "row", "row"]}
        >
          <Flex alignItems={"center"} columnGap={5}>
            <Heading size="lg" color={"#2583CF"}>
              {title}
            </Heading>
            <Search
              search={search}
              placeholder={`Search ${title}`}
              currsearch={setSearch}
            />
          </Flex>
          <Box>
            <Flex columnGap={3} justifyContent={"end"}>
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
                        <Td {...cell.getCellProps()}>
                          {cell.column.id === "action" ? (
                            <Flex columnGap={1}>
                              <Button
                                _hover={{
                                  bg: "#FCD299",
                                  boxShadow: "lg",
                                  transform: "scale(1.2,1.2)",
                                  transition: "0.3s",
                                }}
                                onClick={() => { onOpen(cell.row.values.Pk_inventoryId); setItemId(cell.row.values.Pk_inventoryId) }}
                              >
                                <AiOutlineFolderView color="orange" />
                              </Button>
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

      <InventoryModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} itemId={itemId}/>

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
