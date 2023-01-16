import React, { useState } from "react";
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


  return (
    <>

      <div className="container">
        <Sidebar setTab={setTab} tab={tab} />
        <div className="component-wrapper">
          {tab === "create" && <CreateItem setTab={setTab}/>}
          {tab === "inItem" && <In setTab={setTab} />}

          {tab === "inventory" && <InventoryTable />}
          {tab === "listIn" && <InTable />}
        </div>
      </div>
    </>
  );
};

export default Homepage;
