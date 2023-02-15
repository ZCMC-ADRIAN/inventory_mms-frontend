import React, { useState, useMemo, useEffect } from "react";
import CreateItem from "../Components/CreateItem";
import localApi from "../API/Api";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Container,
  Text,
} from "@chakra-ui/react";
import In from "../Components/In";
import Sidebar from "../Components/Sidebar";
import InventoryTable from "../Components/InventoryTable";
import InTable from "../Components/InTable";

const Homepage = () => {
  const [tab, setTab] = useState("inItem");
  const title = "Inventory";
  const [fetch, setFetch] = useState(false);

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
      // {
      //   Header: "Serial No",
      //   accessor: "serial",
      // },
      // {
      //   Header: "Property No",
      //   accessor: "property_no",
      // },
      {
        Header: "ACTION",
        accessor: "action",
      },
    ],
    []
  );

  return (
    <>
      <div className="container">
        <Sidebar setTab={setTab} tab={tab} />
        <div className="component-wrapper">
          {tab === "create" && <CreateItem setTab={setTab} />}
          {tab === "inItem" && <In setTab={setTab} />}
          {tab === "inventory" && (
            <InventoryTable title={title} fetch={fetch} columns={column} />
          )}
          {tab === "listIn" && <InTable />}
        </div>
      </div>
    </>
  );
};

export default Homepage;
