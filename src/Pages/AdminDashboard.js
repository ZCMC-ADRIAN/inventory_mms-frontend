import React, { useState } from "react";
import InventoryTable from "../Components/InventoryTable";
import InTable from "../Components/InTable";
import AdminSidebar from "../Components/AdminSidebar";
import Accounts from "../Components/Accounts";
// import DeleteModal from "../Components/DeleteModal";
import { useToast } from "@chakra-ui/react";
import VerifyModal from "../Components/VerifyModal";

const AdminDashboard = () => {
  const [tab, setTab] = useState("accounts");
  const [deleteModal, setDeleteModal] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);
  const toast = useToast();
  const [id, setId] = useState("");

  return (
    <>
      {/* {deleteModal && (
        <DeleteModal id={id} toast={toast} setDeleteModal={setDeleteModal} />
      )} */}

      {verifyModal && (
        <VerifyModal id={id} toast={toast} setVerifyModal={setVerifyModal} />
      )}
      <div className="container">
        <AdminSidebar setTab={setTab} tab={tab} />
        <div className="component-wrapper">
          {tab === "accounts" && (
            <Accounts
              setId={setId}
              // setDeleteModal={setDeleteModal}
              setVerifyModal={setVerifyModal}
            />
          )}

          {tab === "inventory" && <InventoryTable />}
          {tab === "listIn" && <InTable />}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
