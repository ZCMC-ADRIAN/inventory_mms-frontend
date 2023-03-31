import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import MassPrinting from "./Components/Printable/MassPrinting";
import Homepage from "./Pages/Homepage";
import BinCard from "./Pages/BinCard";
import Inventory from "./Pages/Inventory";
import PrivateRoutes from "./Authentication/Outlet";
import Report from "./Components/Printable/Report";
import PropertyTag from "./Components/Printable/PropertyTag";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Homepage />} />
            <Route path="/mass-print" element={<MassPrinting />} />
            <Route path="/report" element={<Report />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="tag" element={<PropertyTag />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
