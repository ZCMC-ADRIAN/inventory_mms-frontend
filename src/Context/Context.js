import { createContext, useEffect, useState, useRef } from "react";
import api from "../API/Api";
import { useToast } from "@chakra-ui/react";
import useAuth from "../Hooks/useAuth";
import moment from "moment/moment";
const DataContext = createContext({});

export const Context = ({ children }) => {
  // Create New Item
  const [article, setArticle] = useState("");
  const [articleOther, setArticleOther] = useState("");
  const [type, setType] = useState("");
  const [typeOther, setTypeOther] = useState("");
  const [descOrig, setDescOrig] = useState("");
  const [desc, setDesc] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [detailss, setDetails] = useState("");
  const [other, setOther] = useState("");
  const [brand, setBrand] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [origin, setOrigin] = useState("");
  const [serialNum, setSerialNum] = useState("");
  const [warrantyy, setWarranty] = useState("");
  const [acquisitions, setAcquisition] = useState("");
  const [propertyNum, setPropertyNum] = useState("");
  const [unit, setUnit] = useState("");
  const [location, setLocation] = useState("");
  const [donor, setDonor] = useState("");
  const [donorOther, setDonorOther] = useState("");
  const [remarkss, setRemarkss] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [accessories, setAccessories] = useState("");
  const [acquiMode, setAcquiMode] = useState("");
  const [barcode, setBarcode] = useState("");
  const [inv, setInv] = useState(false);
  const { user } = useAuth();
  const barCodeRef = useRef(null);

  const year = new Date();
  const yearForm = moment(year).format("YYYY");

  const month = new Date();
  const monthForm = moment(month).format("MM");

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

      // console.log(response.data);
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

  const [series, setSeries] = useState([]);
  const [getCateg, setGetCateg] = useState([]);
  const [newProp, setNewProp] = useState("");
  const [prev, setPrev] = useState([]);
  const [areaCode, setAreaCode] = useState([]);
  const [icsNumSeries, setICSNumSeries] = useState([]);
  const [getCost, setGetCost] = useState([]);
  const [icsNumber, setIcsNumber] = useState("");

  const categCode = getCateg.map((obj) => obj.code);
  const areaCodes = areaCode.map((obj) => obj.area_code);
  const prevSeries = prev.map((obj) => obj.series);
  const prevCode = prev.map((obj) => obj.code);
  const itemCost = getCost.map((obj) => obj.cost);

  // useEffect(() => {
  //   if (cost >= 50000 || itemCost >= 50000) {
  //     if (inv === true) {
  //       setNewProp(
  //         yearForm + "-" + prevCode + "-" + prevSeries + "-" + areaCodes[0]
  //       );
  //     } else {
  //       setNewProp(
  //         yearForm + "-" + categCode[0] + "-" + series + "-" + areaCodes[0]
  //       );
  //     }
  //   } else if (cost >= 5000) {
  //     setNewProp("SPHV" + "-" + yearForm + "-" + monthForm + "-" + series);
  //   } else if (cost < 5000) {
  //     setNewProp("SPLV" + "-" + yearForm + "-" + monthForm + "-" + series);
  //   }
  //   setIcsNumber(
  //     yearForm + "-" + monthForm + "-" + icsNumSeries
  //   );
  // });

  useEffect(() => {
    if (cost >= 50000) {
        setNewProp(
          yearForm + "-" + categCode[0] + "-" + series + "-" + areaCodes[0]
        );
    } else if (cost >= 5000) {
      setNewProp("SPHV" + "-" + yearForm + "-" + monthForm + "-" + series);
    } else if (cost < 5000) {
      setNewProp("SPLV" + "-" + yearForm + "-" + monthForm + "-" + series);
    }
    setIcsNumber(
      yearForm + "-" + monthForm + "-" + icsNumSeries
    );
  });

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
  const [inventoryData, setInventoryData] = useState([]);

  const fetchInventoryData = async (value) => {
    const result = await api.get(`/data-table`, {
      params: {
        q: value ? value : "",
      },
    });
    setInventoryData(result.data);
  };

  const fetchPrev = async (value) => {
    let responsePrev = await api.get("/prev", {
      params: { itemId: itemId },
    });
    setPrev(responsePrev.data);
  };

  const fetchAreaCode = async () => {
    let responseAreaCode = await api.get("/locName", {
      params: { locValue: locValue },
    });
    setAreaCode(responseAreaCode.data);
  };

  const fetchICSNumSeries = async () => {
    let responseICSNum = await api.get("/icsnum");
    setICSNumSeries(responseICSNum.data);
  }

  const fetchCost= async() => {
    let responseCost = await api.get("/cost",{
      params: {itemId: itemId}
    });
    setGetCost(responseCost.data);
  }

  useEffect(() => {
    setSelectedAssoc();
    setassocValue("");
    fetchPrev();
    fetchAreaCode();
    fetchICSNumSeries();
    fetchCost();
  }, [selectedLoc, itemId, locValue]);

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
          newProperty: newProp,
          serial: serial,
          barcode: barcode,
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

        //Inventory Table
        inventoryData,
        fetchInventoryData,

        //Create New Item
        article,
        articleOther,
        type,
        typeOther,
        descOrig,
        desc,
        model,
        variant,
        detailss,
        other,
        brand,
        manufacturer,
        origin,
        serialNum,
        warrantyy,
        acquisitions,
        propertyNum,
        unit,
        location,
        donor,
        donorOther,
        remarkss,
        category,
        cost,
        accessories,
        acquiMode,
        barcode,
        prev,
        user,
        barCodeRef,
        itemCost,
        setArticle,
        setArticleOther,
        setType,
        setTypeOther,
        setDescOrig,
        setDesc,
        setModel,
        setVariant,
        setDetails,
        setOther,
        setBrand,
        setManufacturer,
        setOrigin,
        setSerialNum,
        setWarranty,
        setAcquisition,
        setPropertyNum,
        setUnit,
        setLocation,
        setDonor,
        setDonorOther,
        setRemarkss,
        setCategory,
        setCost,
        setAccessories,
        setAcquiMode,
        setBarcode,
        setSeries,
        setGetCateg,
        newProp,
        setPrev,
        setInv,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
