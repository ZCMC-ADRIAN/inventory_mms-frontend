import React, {useState} from "react";
import "./Sidebar.css";
import Nouser from "../Assets/nouser.png";
import useAuth from "../Hooks/useAuth";
import {FcDocument, FcAddDatabase, FcRight, FcLeft, FcUpLeft} from 'react-icons/fc'
import { useNavigate } from "react-router-dom";
import localApi from "../API/Api";

const Sidebar = ({ setTab, tab }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const logout = () => {
    let cancel = true;
    const out = async () => {
      const response = await localApi.post("logout");
      if (cancel) {
        if (response.data.status === 1) {
          navigate('/');
          sessionStorage.removeItem('Authorization');
        }
      }
    };
    out();
    return () => {
      cancel = false;
    };
  };


  return (
    <>
    <div className="sidebar">
      <div className="header">
        <div className="avatar">
          <img src={Nouser} alt="Avatar Profile" />
        </div>
        <h1 className="name">{user?.firstname + " " + user?.lastname}</h1>
        <h2>
          MMS | <span onClick={logout}>Logout</span>
        </h2>
      </div>

      <div className="navigation">
        <label>Manage</label>
        <ul style={{ marginBottom: "40px" }}>
          <li
            onClick={() => setTab("inItem")}
            className={tab === "inItem" || tab === "create" ? "active" : ""}
          >
            <p>
              <FcRight />
            </p>
            <text>In Item</text>
          </li>
        </ul>

        <label>Monitor</label>
        <ul>
          <li
            onClick={() => setTab("inventory")}
            className={tab === "inventory" ? "active" : ""}
          >
            <p>
              <FcDocument />
            </p>
            <text>Inventory</text>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
