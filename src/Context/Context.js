import { createContext, useState, useEffect } from "react";
import api from "../API/Api";

const DataContext = createContext({});

export const Context = ({ children }) => {
  const [appState, setAppState] = useState(null);
  const [item, setItem] = useState([]);
  const [outItem, setOutItem] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [verified, setVerified] = useState(null);
  const [inItem, setInItem] = useState([]);
  const [returnItem, setReturnItem] = useState([]);
  const [people, setPeople] = useState([]);

  const [itemId, setItemId] = useState("");
  const [itemDatas, setItemDatas] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedItemIndex, setSelectedItemindex] = useState();
  ///////////DELETE TOP/////////////
  ////////////////////////////

  //////////////////
  //Loc


  const fetchItem = async (value) => {
    try {
      const response = await api.get("/itemdetail/" + value);
      setItemDetails(response.data);
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
    const result = await api.get("/api/location", {
      params: {
        q: value,
      },
    });
    setLocDatas(result.data);
  };


  //modaldetails 
  const [itemdetails, setItemDetails] = useState(null)



  //Cond
  const [condId, setCondId] = useState("");
  const [condDatas, setCondDatas] = useState([]);
  const [CondItem, setConItem] = useState([]);
  const [selectedCondIndex, setSelectedCondindex] = useState();

  const [deliveryD, setdelivery] = useState("");
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

        condId,
        condDatas,
        CondItem,
        selectedCondIndex,
        deliveryD,
        quantity,
        packZ,
        loose,
        remarks,
        //setters
        setCondId,
        setCondDatas,
        setConItem,
        setSelectedCondindex,
        setdelivery,
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
