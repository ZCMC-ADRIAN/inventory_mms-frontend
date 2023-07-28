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
  const [fundCluster, setFundCluster] = useState("");
  const [otherCluster, setOtherCluster] = useState("");
  const [inv, setInv] = useState(false);
  const [create, setCreate] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const { user } = useAuth();
  const barCodeRef = useRef(null);

  const [peripArticle, setPeripArticle] = useState("");
  const [peripMode, setPeripMode] = useState("");
  const [addArticle, setAddArticle] = useState("");
  const [addType, setAddType] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [getArticle, setGetArticle] = useState([]);
  const [getTypes, setGetTypes] = useState([]);
  const [addTypes, setAddTypes] = useState([]);
  const [peripTypes, setPeripTypes] = useState([]);
  const [getSupplier, setGetSupplier] = useState([]);
  const [getCluster, setGetCluster] = useState([]);
  const [selectEquipment, setSelectEquipment] = useState('');

  //Store Data of Added Peripherals
  const [formDataArray, setFormDataArray] = useState([]);

  //States for ICS
  const [PO, setPO] = useState("");
  const [PODate, setPODate] = useState("");
  const [invoice, setInvoice] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [ors, setOrs] = useState("");
  const [ICSRemarks, setICSRemarks] = useState("");
  const [ics, setIcs] = useState("");
  const [ICSIAR, setICSIAR] = useState("");
  const [ICSDRF, setICSDRF] = useState("");
  const [ICSDRFDate, setICSDRFDate] = useState("");
  const [ICSPTR, setICSPTR] = useState("");

  //States for PAR
  const [DRF, setDRF] = useState("");
  const [DRFDate, setDRFDate] = useState("");
  const [IAR, setIAR] = useState("");
  const [PARRemarks, setPARRemarks] = useState("");
  const [PARInvoice, setPARInvoice] = useState("");
  const [PARors, setPARors] = useState("");
  const [PARConformed, setPARConformed] = useState("");
  const [PARInvoiceDate, setPARInvoiceDate] = useState("");
  const [PTR, setPTR] = useState("");
  const [parPODate, setParPODate] = useState("");
  const [parPO, setParPO] = useState("");
  const [par, setPar] = useState("");

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

  useEffect(() => {
    const savedData = localStorage.getItem("peripherals");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormDataArray(parsedData);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('peripherals', formDataArray);
      console.log(response.data);
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
  const [prevCode, setPrevCode] = useState([]);
  const [areaCode, setAreaCode] = useState([]);
  const [numSeries, setNumSeries] = useState([]);
  const [getCost, setGetCost] = useState([]);
  const [icsNumber, setIcsNumber] = useState("");
  const [parNumber, setParNumber] = useState("");

  const categCode = getCateg.map((obj) => obj.code);
  const areaCodes = areaCode.map((obj) => obj.area_code);
  const prevCategCode = prevCode.map((obj) => obj.code);
  const itemCost = getCost.map((obj) => obj.cost);

  //Execute if the  In Button is click or true
  useEffect(() => {
    if (inv === true) {
      if (itemCost >= 50000) {
        setNewProp(
          yearForm + "-" + prevCategCode + "-" + prev + "-" + areaCodes[0]
        );
      } else if (itemCost >= 5000) {
        setNewProp("SPHV" + "-" + yearForm + "-" + monthForm + "-" + prev);
      } else if (itemCost < 5000) {
        setNewProp("SPLV" + "-" + yearForm + "-" + monthForm + "-" + prev);
      }
    }
  });

  //Execute if the In Button is unclick or false
  useEffect(() => {
    if (inv === false) {
      if (cost >= 50000 || itemCost >= 50000) {
        setNewProp(
          acquiMode === "Donation"
            ? "D" +
                yearForm +
                "-" +
                categCode[0] +
                "-" +
                series +
                "-" +
                areaCodes[0]
            : yearForm + "-" + categCode[0] + "-" + series + "-" + areaCodes[0]
        );
        setParNumber(yearForm + "-" + monthForm + "-" + numSeries);
      } else if (cost >= 5000) {
        setNewProp("SPHV" + "-" + yearForm + "-" + monthForm + "-" + series);
        setIcsNumber(yearForm + "-" + monthForm + "-" + numSeries);
      } else if (cost < 5000) {
        setNewProp("SPLV" + "-" + yearForm + "-" + monthForm + "-" + series);
        setIcsNumber(yearForm + "-" + monthForm + "-" + numSeries);
      }
    }
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

  //Condition
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

  const fetchNumSeries = async () => {
    let responseNum = await api.get("/numseries", {
      params: { cost: cost },
    });
    setNumSeries(responseNum.data);
  };

  const fetchCost = async () => {
    let responseCost = await api.get("/cost", {
      params: { itemId: itemId },
    });
    setGetCost(responseCost.data);
  };

  const fetchPrevCode = async () => {
    let responsePrevCode = await api.get("/prevCode", {
      params: { itemId: itemId },
    });
    setPrevCode(responsePrevCode.data);
  };

  useEffect(() => {
    fetchNumSeries();
  }, [cost]);

  useEffect(() => {
    setSelectedAssoc();
    setassocValue("");
    fetchPrev();
    fetchAreaCode();
    fetchNumSeries();
    fetchCost();
    fetchPrevCode();
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
    setBarcode("");
    setCountryValue([]);
    setSelectedCountry(null);
    setVarietyVal([]);
    setSelectedVariety(null);
    setdetails(null);
    setwarranty(null);
    setacquisition(null);
    setexpiration(null);
  };

  const clearPAR = () => {
    setDRF("");
    setDRFDate("");
    setIAR("");
    setPARRemarks("");
    setParPO("");
    setPTR("");
    setParPODate("");
    setPar("");
    setPARInvoice("");
    setPARors("");
    setPARConformed("");
    setPARInvoiceDate("");
  }

  const clearICS = () => {
    setPO("");
    setPODate("");
    setInvoice("");
    setInvoiceDate("");
    setOrs("");
    setICSRemarks("");
    setIcs("");
    setICSIAR("");
    setICSDRF("");
    setICSDRFDate("");
    setICSPTR("");
  }

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
          inv: inv,
          itemCost: itemCost,
          cost: cost,
          remarks: remarks,
          EditVariety: selectedVariety && selectedVariety.Pk_varietyId,
          EditCountry: selectedCountry && selectedCountry.Pk_countryId,
          Editdetails: details,
          Editwarranty: warranty,
          Editacquisition: acquisition,
          Editexpiration: expiration,
          countryValue: countryValue,
          varietyVal: varietyVal,
          icsNumber: icsNumber,
          parNumber: parNumber,
          isNew: isNew,
          oldPAR: par,
          oldICS: ics
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
        setNewProp,
        setPrev,
        setInv,
        inv,
        getCost,
        create,
        setCreate,
        peripArticle,
        setPeripArticle,
        peripMode, setPeripMode,
        formDataArray, setFormDataArray,
        handleSubmit,
        showForm, setShowForm,
        getArticle, setGetArticle,
        getTypes, setGetTypes,
        getSupplier, setGetSupplier,
        addArticle, setAddArticle,
        addType, setAddType,
        addTypes, setAddTypes,
        peripTypes, setPeripTypes,
        selectEquipment, setSelectEquipment,
        par, setPar,
        ics, setIcs,
        fundCluster, setFundCluster,
        otherCluster, setOtherCluster,
        getCluster, setGetCluster,
        isNew, setIsNew,

        //ICS
        PO,
        setPO,
        PODate,
        setPODate,
        invoice,
        setInvoice,
        invoiceDate,
        setInvoiceDate,
        ors,
        setOrs,
        ICSRemarks,
        setICSRemarks,
        ics, setIcs,
        ICSIAR, setICSIAR,
        ICSDRF, setICSDRF,
        ICSDRFDate, setICSDRFDate,
        ICSPTR, setICSPTR,
        clearICS,

        //PAR
        DRF,
        setDRF,
        DRFDate,
        setDRFDate,
        IAR,
        setIAR,
        PARRemarks,
        setPARRemarks,
        PARInvoice, setPARInvoice,
        PARors, setPARors,
        PARConformed, setPARConformed,
        PARInvoiceDate, setPARInvoiceDate,
        PTR, setPTR,
        parPODate, setParPODate,
        parPO, setParPO,
        par, setPar,
        clearPAR
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

