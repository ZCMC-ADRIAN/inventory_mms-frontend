import React, { useState, useMemo } from "react";
import CreateItem from "../Components/CreateItem";
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

  const column = useMemo(
    () => [
      {
        Header: "No",
        accessor: "id",
      },
      {
        Header: "Item Description",
        accessor: "desc",
      },
      {
        Header: "Available",
        accessor: "available",
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
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "ACTION",
        accessor: "action",
      },
    ],
    []
  );

  const Department_Dataset = [
    {
      id: 1,
      desc: 'Speaker System Stereo Megaoke',
      available: 20,
      issued: 0,
      returned: 0,
      category: "Equipment"
    },
    {
      id: 2,
      desc: 'Speaker System Stereo Megaoke',
      available: 20,
      issued: 0,
      returned: 0,
      category: "Equipment"
    },
    {
      id: 3,
      desc: 'Speaker System Stereo Megaoke',
      available: 20,
      issued: 0,
      returned: 0,
      category: "Equipment"
    },
    {
      id: 4,
      desc: 'Speaker System Stereo Megaoke',
      available: 20,
      issued: 0,
      returned: 0,
      category: "Equipment"
    },
    {
      id: 5,
      desc: 'Speaker System Stereo Megaoke',
      available: 20,
      issued: 0,
      returned: 0,
      category: "Equipment"
    }
  ];

  return (
    <>
      <div className="container">
        <Sidebar setTab={setTab} tab={tab} />
        <div className="component-wrapper">
          {tab === "create" && <CreateItem setTab={setTab} />}
          {tab === "inItem" && <In setTab={setTab} />}
          {tab === "inventory" && (
            <InventoryTable title={title} fetch={fetch} columns={column} data={Department_Dataset}/>
          )}
          {tab === "listIn" && <InTable />}
        </div>
      </div>
    </>
  );
};

export default Homepage;
