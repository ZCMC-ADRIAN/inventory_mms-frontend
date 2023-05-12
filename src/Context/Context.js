import { createContext, useEffect, useState } from "react";
import api from "../API/Api";
import { useToast } from "@chakra-ui/react";
const moment = require("moment");
const DataContext = createContext({});

export const Context = ({ children }) => {
  const toast = useToast();

  const fetchItem = async (value) => {
    try {
      var response = await api.get("/itemdetail/" + value);
      setItemId(value);
      response.data[0].Warranty = moment(response.data[0].Warranty).format(
        "MMMM DD YYYY"
      );
      response.data[0]["Acquisition Date"] = moment(
        response.data[0]["Acquisition Date"]
      ).format("MMMM DD YYYY");
      response.data[0]["Expiration Date"] = moment(
        response.data[0]["Expiration Date"]
      ).format("MMMM DD YYYY");

      console.log(response.data);
      setItemDetails(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const [countryDatas, setCountryDatas] = useState([]);
  const [countryValue, setCountryValue] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const fetchCountry = async (value) => {
    const result = await api.get("/country", {
      params: {
        q: value,
      },
    });
    setCountryDatas(result.data);
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

  const [varietyDatas, setVarietyDatas] = useState([]);
  const [varietyVal, setVarietyVal] = useState([]);
  const [selectedVariety, setSelectedVariety] = useState();
  const fetchVar = async () => {
    //http://127.0.0.1:8000/api/location
    const result = await api.get("/variety");
    setVarietyDatas(result.data);
  };

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
  const [details, setdetails] = useState(null);
  const [warranty, setwarranty] = useState(null);
  const [acquisition, setacquisition] = useState(null);
  const [expiration, setexpiration] = useState(null);

  const [tableData, setTableData] = useState([]);

  const fetchTableData = async (value) => {
    const result = await api.get(`/itemtable`, {
      params: {
        q: value ? value : "",
      },
    });
    result.data.forEach((element, index) => {
      result.data[index]["warranty"] = moment(
        result.data[index]["warranty"]
      ).format("MMMM DD YYYY");
      result.data[index]["acquisition_date"] = moment(
        result.data[index]["acquisition_date"]
      ).format("MMMM DD YYYY");
      result.data[index]["expiration"] = moment(
        result.data[index]["expiration"]
      ).format("MMMM DD YYYY");
    });
    setTableData(result.data);
  };

  {
    /*
  response.data[0].Warranty = moment(response.data[0].Warranty).format(
        "MMMM DD YYYY"
      );
      response.data[0]["Acquisition Date"] = moment(
        response.data[0]["Acquisition Date"]
      ).format("MMMM DD YYYY");
      response.data[0]["Expiration Date"] = moment(
        response.data[0]["Expiration Date"]
      ).format("MMMM DD YYYY");
*/
  }

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
    setquantity("");
    setLoose("");
    setpropertyno("");
    setserial("");
    setRemarks("");
    setCountryValue([]);
    setSelectedCountry(null);
    setVarietyVal([]);
    setSelectedVariety(null);
    setdetails(null);
    setwarranty(null);
    setacquisition(null);
    setexpiration(null);
  };

  const postInventory = async (itemtobe) => {
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
    if (!assocValue) {
      toast({
        title: `please select Associate or select none`,
        status: "error",
        isClosable: true,
      });
      return;
    }
    try {
      const response = await api
        .post("/inv", {
          itemId: itemtobe || itemId,
          condition_id: selectedCond && selectedCond.Pk_conditionsId,
          location_id: selectedLoc && selectedLoc.Pk_locationId,
          assoc_id: selectedAssoc && selectedAssoc.Pk_assocId,
          newcondition_name: condItem,
          newlocation_name: locValue,
          newAssoc_name: assocValue,
          delivery_date: deliveryD,
          property_no: propertyno,
          serial: serial,
          quantity: 1,
          loose: loose,
          remarks: remarks,
          EditVariety: selectedVariety && selectedVariety.Pk_varietyId,
          EditCountry: selectedCountry && selectedCountry.Pk_countryId,
          Editdetails: details,
          Editwarranty: warranty,
          Editacquisition: acquisition,
          Editexpiration: expiration,
          countryValue: countryValue,
          varietyVal: varietyVal,
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
        setItemId,
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
        clearAll,

        condDatas,
        condItem,
        selectedCond,
        deliveryD,
        quantity,
        loose,
        remarks,
        propertyno,
        serial,
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

        //Variety
        varietyDatas,
        varietyVal,
        setVarietyVal,
        selectedVariety,
        setSelectedVariety,
        fetchVar,

        //Country
        countryDatas,
        countryValue,
        setCountryValue,
        selectedCountry,
        setSelectedCountry,
        fetchCountry,

        //edited states nullable
        details,
        setdetails,
        warranty,
        setwarranty,
        acquisition,
        setacquisition,
        expiration,
        setexpiration,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
