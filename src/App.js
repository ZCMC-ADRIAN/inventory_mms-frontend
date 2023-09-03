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
import Inventory from "./Pages/Inventory";
import PrivateRoutes from "./Authentication/Outlet";
import ReportArea from "./Components/Printable/ReportArea";
import PropertyTag from "./Components/Printable/PropertyTag";
import ReportPerson from "./Components/Printable/ReportPerson";
import Conditions from "./Components/Printable/Conditions";
import GeneratePAR from "./Components/Printable/GeneratePAR";
import GenerateICS from "./Components/Printable/GenerateICS";

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
            <Route path="/report/area" element={<ReportArea />} />
            <Route path="/report/person" element={<ReportPerson />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="tag" element={<PropertyTag />} />
            <Route path="generate/par" element={<GeneratePAR />} />
            <Route path="generate/ics" element={<GenerateICS />} />
            <Route path="report/not-found" element={<Conditions />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
