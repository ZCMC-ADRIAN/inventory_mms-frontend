import React, {useRef} from "react";
import { useNavigate } from "react-router-dom";
import localApi from "../API/Api";
import "./Sidebar.css";
import Nouser from "../Assets/nouser.png";
import useAuth from "../Hooks/useAuth";
import { useClickOutside } from "./useClickOutside";
import { FaAngleRight, FaAngleLeft, FaBars } from "react-icons/fa";
import { MdQrCodeScanner, MdInventory, MdOutlineLogin, MdArticle } from "react-icons/md";

function Sidebar({ visible, show, tab, setTab }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const domNod = useClickOutside(() => {
    show(false);
  });

  const logout = () => {
    let cancel = true;
    const out = async () => {
      const response = await localApi.post("logout");
      if (cancel) {
        if (response.data.status === 1) {
          navigate("/");
          sessionStorage.removeItem("Authorization");
        }
      }
    };
    out();
    return () => {
      cancel = false;
    };
  };

  return (
    <div>
      <div className="mobile-nav">
        <button className="mobile-nav-btn" onClick={() => show(!visible)}>
          <FaBars size={24} />
        </button>
      </div>
      <nav className={!visible ? "navbar" : ""}>
        <button
          type="button"
          className="nav-btn"
          onClick={() => show(!visible)}
        >
          {!visible ? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
        </button>

        <div className="header">
          <div className="avatar">
            <img src={Nouser} alt="Avatar Profile" />
          </div>
          <h1 className="name">{user?.firstname + " " + user?.lastname}</h1>
          <h2 className="office-label">
            MMS |{" "}
            <span className="logout" onClick={logout}>
              Logout
            </span>
          </h2>
        </div>

        <div className="navigation">
          <label>Manage</label>
          <ul style={{ marginBottom: "40px" }}>
            <li
              onClick={() => setTab("inItem")}
              className={tab === "inItem" || tab === "create" ? "active" : ""}
            >
              <p className="sidebar-icon">
                <MdOutlineLogin />
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
              <p className="sidebar-icon">
                <MdInventory />
              </p>
              <text>Inventory</text>
            </li>
          </ul>

          <ul style={{ marginBottom: "40px" }}>
            <li
            onClick={() => {setTab("scanner")}}
            className={tab === "scanner" ? "active" : ""}
            >
              <p className="sidebar-icon">
                <MdQrCodeScanner />
              </p>
              <text>QR Scanner</text>
            </li>
          </ul>

          <label>Generate</label>
          <ul>
            <li
              onClick={() => {setTab("report"); navigate('/no')}}
              className={tab === "report" ? "active" : ""}
            >
              <p className="sidebar-icon">
                <MdArticle />
              </p>
              <text>No Property #</text>
              
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
