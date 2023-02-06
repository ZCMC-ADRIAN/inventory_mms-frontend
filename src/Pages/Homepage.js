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
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Equipment from "../Components/Items/Equipment";
import InventoryTable from "../Components/InventoryTable";
import InTable from "../Components/InTable";

const Homepage = () => {
  const [tab, setTab] = useState("inItem");
  const title = "Inventory";
  const [fetch, setFetch] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let responseData = await localApi.get("data-table");
    setData(responseData.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const column = useMemo(
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
        Header: "Available",
        accessor: "Quantity",
      },
      {
        Header: "Issued",
        accessor: "issued",
      },
      {
        Header: "Returned",
        accessor: "returned",
      },
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
              <InventoryTable
                title={title}
                fetch={fetch}
                columns={column}
                data={data}
              />
            )}
            {tab === "listIn" && <InTable />}
        </div>
      </div>
    </>
  );
};

export default Homepage;
