import { createContext, useState } from "react";
import api from "../API/Api";

const DataContext = createContext({});

export const Context = ({ children }) => {
  // const [appState, setAppState] = useState(null);
  // const [item, setItem] = useState([]);
  // const [outItem, setOutItem] = useState([]);
  // const [inventory, setInventory] = useState([]);
  // const [equipment, setEquipment] = useState([]);
  // const [verified, setVerified] = useState(null);
  // const [inItem, setInItem] = useState([]);
  // const [returnItem, setReturnItem] = useState([]);
  // const [people, setPeople] = useState([]);

  // const [itemDatas, setItemDatas] = useState([]);
  // const [selectedItem, setSelectedItem] = useState([]);
  // const [selectedItemIndex, setSelectedItemindex] = useState();
  ///////////DELETE TOP/////////////
  ////////////////////////////

  //////////////////
  //Loc

  const postInventory = async () => {
    try {
      const response = await api.post("/inv", {
        deliveryD: deliveryD,
        iarDate: iarDate,
        iarNo: iarNo,
        quantity: quantity,
        packZ: packZ,
        loose: loose,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchItem = async (value) => {
    try {
      const response = await api.get("/itemdetail/" + value);
      setItemDetails(response.data);
      setItemId(value);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const [locDatas, setLocDatas] = useState([]);
  const [locValue, setLocValue] = useState([]);
  const [selectedLoc, setSelectedLoc] = useState();
  const fetchLoc = async (value) => {
    //http://127.0.0.1:8000/api/location
    const result = await api.get("/location", {
      params: {
        q: value,
      },
    });
    setLocDatas(result.data);
  };

  //modaldetails
  const [itemdetails, setItemDetails] = useState(null);

  //Cond
  const [condDatas, setCondDatas] = useState([]);
  const [condItem, setConItem] = useState([]);
  const [selectedCond, setSelectedCond] = useState();
  const fetchcond = async (value) => {
    //http://127.0.0.1:8000/api/location
    const result = await api.get("/condition", {
      params: {
        q: value,
      },
    });
    setCondDatas(result.data);
  };

  const [itemId, setItemId] = useState(null); ///

  const [deliveryD, setdeliveryD] = useState("");
  const [iarDate, setIarDate] = useState("");
  const [iarNo, setIarNo] = useState("");
  const [quantity, setquantity] = useState("");
  const [packZ, setpackZ] = useState("");
  const [loose, setLoose] = useState("");
  const [remarks, setRemarks] = useState("");

  return (
    <DataContext.Provider
      value={{
        // locId,
        // locDatas,
        // locItem,
        // selectedLocIndex,
        fetchcond,
        postInventory,
        itemId,
        iarDate,
        setIarDate,
        iarNo,
        setIarNo,
        //items
        fetchItem,
        /*location*/
        itemdetails,
        locDatas,
        locValue,
        selectedLoc,
        setLocDatas,
        setLocValue,
        setSelectedLoc,
        fetchLoc,

        condDatas,
        condItem,
        selectedCond,
        deliveryD,
        quantity,
        packZ,
        loose,
        remarks,
        //setters

        setCondDatas,
        setConItem,
        setSelectedCond,
        setdeliveryD,
        setquantity,
        setpackZ,
        setLoose,
        setRemarks,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
