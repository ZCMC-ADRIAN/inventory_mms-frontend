import { createContext, useEffect, useState } from "react";
import api from "../API/Api";
import { useToast } from "@chakra-ui/react";
const DataContext = createContext({});

export const Context = ({ children }) => {
  const toast = useToast();

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

  const [assocDatas, setassocDatas] = useState([]);
  const [assocValue, setassocValue] = useState([]);
  const [selectedAssoc, setSelectedAssoc] = useState();

  const fetchAssoc = async () => {
    console.log(`/assoc/${selectedLoc && selectedLoc.Pk_locationId}`);
    const result = await api.get(
      `/assoc/${selectedLoc && selectedLoc.Pk_locationId}`
    );
    setassocDatas(result.data);
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
  const [quantity, setquantity] = useState("");
  const [propertyno, setpropertyno] = useState("");
  const [serial, setserial] = useState("");
  const [loose, setLoose] = useState("");
  const [remarks, setRemarks] = useState("");

  const [tableData, setTableData] = useState([]);
  const fetchTableData = async (value) => {
    const result = await api.get(`/itemtable`, {
      params: {
        q: value ? value : "",
      },
    });
    setTableData(result.data);
  };
  useEffect(() => {
    setSelectedAssoc();
    setassocValue("");
  }, [selectedLoc]);

  const clearAll = () => {
    setItemId(null);
    setSelectedCond(null);
    setSelectedLoc(null);
    setSelectedAssoc(null);
    setConItem([]);
    setLocValue([]);
    setassocValue([]);
    setdeliveryD("");
    setpropertyno("");
    setserial("");
    setquantity("");
    setLoose("");
    setRemarks("");
  };

  const postInventory = async () => {
    if (locValue.length < 1) {
      toast({
        title: `please select Location`,
        status: "error",
        isClosable: true,
      });
      return;
    }
    if (condItem.length < 1) {
      toast({
        title: `please select condition`,
        status: "error",
        isClosable: true,
      });
      return;
    }
    if (deliveryD === "" || deliveryD === null) {
      toast({
        title: `please select Delivery Date`,
        status: "error",
        isClosable: true,
      });
      return;
    }
    if (quantity === "" || quantity === null) {
      toast({
        title: `please enter quantity`,
        status: "error",
        isClosable: true,
      });
      return;
    }
    try {
      const response = await api
        .post("/inv", {
          itemId: itemId,
          condition_id: selectedCond && selectedCond.Pk_conditionsId,
          location_id: selectedLoc && selectedLoc.Pk_locationId,
          assoc_id: selectedAssoc && selectedAssoc.Pk_assocId,
          newcondition_name: condItem,
          newlocation_name: locValue,
          newAssoc_name: assocValue,
          delivery_date: deliveryD,
          property_no: propertyno,
          serial: serial,
          quantity: quantity,
          loose: loose,
          remarks: remarks,
        })
        .then((e) => {
          fetchTableData();
          return e;
        });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        clearAll,
        fetchcond,
        postInventory,
        itemId,
        fetchItem,
        itemdetails,
        locDatas,
        locValue,
        selectedLoc,
        setLocDatas,
        setLocValue,
        setSelectedLoc,
        fetchLoc,
        setpropertyno,
        setserial,
        tableData,
        fetchTableData,

        condDatas,
        condItem,
        selectedCond,
        deliveryD,
        quantity,
        loose,
        remarks,
        //setters

        setCondDatas,
        setConItem,
        setSelectedCond,
        setdeliveryD,
        setquantity,
        setLoose,
        setRemarks,

        //assoc
        assocDatas,
        setassocDatas,
        assocValue,
        setassocValue,
        selectedAssoc,
        setSelectedAssoc,
        fetchAssoc,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
