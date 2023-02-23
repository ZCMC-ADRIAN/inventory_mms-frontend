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
            <Route path="bin-card" element={<BinCard />} />
            <Route path="inventory" element={<Inventory />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
