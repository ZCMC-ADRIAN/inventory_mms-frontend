import React, { useState, useMemo, useEffect } from "react";
import CreateItem from "../Components/CreateItem";

import In from "../Components/In";
import Sidebar from "../Components/Sidebar";
import Inventory from "../Components/Inventory";
import InTable from "../Components/InTable";
import QRScanner from "../Components/QRScanner";

const Homepage = () => {
  const [tab, setTab] = useState("inItem");
  const title = "Inventory";
  const [fetch, setFetch] = useState(false);
  const [navVisible, showNavbar] = useState(true);

  const [isDesktop, setDesktop] = useState(window.innerWidth > 680);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 680);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <>
      <div className="container">
        <Sidebar setTab={setTab} tab={tab} visible={ navVisible } show={ showNavbar }/>
        <div className="component-wrapper" style={{paddingLeft: navVisible && isDesktop ? "250px" : "0px" }}>
          {tab === "create" && <CreateItem setTab={setTab} />}
          {tab === "inItem" && <In setTab={setTab} />}
          {tab === "inventory" && (
            <Inventory title={title} fetch={fetch}/>
          )}
          {tab === "listIn" && <InTable />}
          {tab === "scanner" && <QRScanner setTab={setTab}/>}
        </div>
      </div>
    </>
  );
};

export default Homepage;
