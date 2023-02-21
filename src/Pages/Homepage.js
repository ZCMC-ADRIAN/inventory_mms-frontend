import React, { useState, useMemo } from "react";
import CreateItem from "../Components/CreateItem";

import In from "../Components/In";
import SidebarContent from "../Components/Sidebar";
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
      {
        Header: "Location",
        accessor: "location_name"
      },
      {
        Header: "Category",
        accessor: "itemCateg_name"
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
        <SidebarContent setTab={setTab} tab={tab} />
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
