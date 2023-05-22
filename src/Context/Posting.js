import { createContext, useState, useEffect } from "react";
import localApi from "../API/Api";

const PostContext = createContext({});

export const DataPosting = ({children}) => {
    const [article, setArticle] = useState("");
    const [articleOther, setArticleOther] = useState("");
    const [type, setType] = useState("");
    const [typeOther, setTypeOther] = useState("");
    const [descOrig, setDescOrig] = useState("");
    const [desc, setDesc] = useState("");
    const [model, setModel] = useState("");
    const [variant, setVariant] = useState("");
    const [details, setDetails] = useState("");
    const [other, setOther] = useState("");
    const [brand, setBrand] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [origin, setOrigin] = useState("");
    const [serialNum, setSerialNum] = useState("");
    const [warranty, setWarranty] = useState("");
    const [acquisition, setAcquisition] = useState("");
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

    useEffect(() => {
        setDesc(
          (article === "Other" ? articleOther : article) +
            " " +
            (type === "Other" ? typeOther : type) +
            " " +
            model +
            " " +
            variant +
            " " +
            details
        );
      }, [article, articleOther, type, typeOther, model, variant, details, other]);

    return (
       <PostContext.Provider
       value={{
        //Current State
        article,
        articleOther,
        type,
        typeOther,
        descOrig,
        desc,
        model,
        variant,
        details,
        other,
        brand,
        manufacturer,
        origin,
        serialNum,
        warranty,
        acquisition,
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

        //Set States
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
        setBarcode
       }}
       >
        {children}
       </PostContext.Provider>
    );
}

export default PostContext;