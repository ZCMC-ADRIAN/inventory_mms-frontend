import { useTable, usePagination } from "react-table";
import { IoAddCircleOutline } from "react-icons/io5";
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
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import "./Table.css";

import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
import { BsFillCloudDownloadFill } from "react-icons/bs";

import { AiOutlineFolderView, AiFillEdit } from "react-icons/ai";
import { HiTrash } from "react-icons/hi";

import moment from "moment/moment";
import { Children, useContext, useEffect, useState } from "react";
import VerificationModal from "./VerificationModal";
import { VerticallyCenter } from "./inputModal";
import SearchSel from "./searchableSelect/searchSel";
import DataContext from "../Context/Context";

const ActionsBtn = () => {
  return (
    <Flex columnGap={1}>
      <Button
        _hover={{
          bg: "#BEEFDA",
          boxShadow: "lg",
          transform: "scale(1.2,1.2)",
          transition: "0.3s",
        }}
      >
        <AiOutlineFolderView color="teal" />
      </Button>
      <Button
        _hover={{
          bg: "lightgray",
          boxShadow: "lg",
          transform: "scale(1.2,1.2)",
          transition: "0.3s",
        }}
      >
        <AiFillEdit color="grey" />
      </Button>
      <Button
        _hover={{
          bg: "#FCD299",
          boxShadow: "lg",
          transform: "scale(1.2,1.2)",
          transition: "0.3s",
        }}
      >
        <HiTrash color="darkorange" />
      </Button>
    </Flex>
  );
};

const CustomTable = ({ title, columns, data, child, children }) => {
  const { fetchItem } = useContext(DataContext);
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
  const [id, setid] = useState(null);

  const CustomBtnTheme = {
    backgroundColor: "#9AE6B4",
    borderRadius: "52px",
    fontSize: "20px",
  };

  return (
    <Box bg={"white"} padding={"20px"}>
      {children}
      <VerticallyCenter
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        id={id}
      ></VerticallyCenter>
      <Box w={"100%"}>
        <Flex flexDirection={["column", "column", "row", "row"]}>
          <Box w={"100%"}>
            <Flex justifyContent={"space-between"} alignItems={"end"}>
              <Heading paddingLeft={"25px"} size="lg" color={"teal"}>
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
          mb={5}
          bg={"white"}
          maxWidth={"100%"}
          className={"table"}
          variant="unstyled"
          boxShadow={"2xl"}
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
                      onOpen();
                      // console.log(fetchItem(row.original.Pk_itemId));
                      fetchItem(row.original.Pk_itemId);
                    }}
                    className="td"
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
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
      {page.length >= 1 ? (
        <Flex justifyContent={"end"} bg={"rgba(0,0,0,0.05)"} mt={5}>
          <div id="btnleft">
            <Tooltip label="First Page">
              <IconButton
                style={CustomBtnTheme}
                onClick={() => gotoPage(0)}
                isDisabled={!canPreviousPage}
                icon={<ArrowLeftIcon h={3} w={3} />}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                style={CustomBtnTheme}
                className="paginationbtn"
                onClick={previousPage}
                isDisabled={!canPreviousPage}
                icon={<ChevronLeftIcon h={6} w={6} />}
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
                icon={<ChevronRightIcon h={6} w={6} />}
              />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton
                style={CustomBtnTheme}
                className="paginationbtn"
                onClick={() => gotoPage(pageCount - 1)}
                isDisabled={!canNextPage}
                icon={<ArrowRightIcon h={3} w={3} />}
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
