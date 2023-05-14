import React, {CSSProperties} from "react";
import "./Loader.css";
import { HashLoader } from "react-spinners/HashLoader";

const Loader = () => {
  return (
    <div className="loader-container">
      <HashLoader color="#36d7b7" />
    </div>
  );
};

export default Loader;
