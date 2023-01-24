import { createContext, useState, useEffect } from "react";
import api from "../API/Api";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [appState, setAppState] = useState(null);
  const [item, setItem] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [inItem, setInItem] = useState([]);
  const [people, setPeople] = useState([]);

  // const fetchUser = async () => {
  //   try {
  //     const response = await api.get("/api/auth/login");

  //     if (response) {
  //       setUser(response.data);
  //     }
  //   } catch (error) {
  //     setUser(null);
  //   }
  // };

  // useEffect(() => {
  //   api
  //     .get("inventory", {
  //       inventory,
  //     })
  //     .then((response) => {
  //       setInventory(response.data);
  //     });
  // }, [appState]);

  // useEffect(() => {
  //   fetch(getUniqueAPI, { method: "get" })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data) {
  //         setItem(data.filter((e) => e.desc !== ""));
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, [appState]);

  // const fetchInventory = async () => {
  //   try {
  //     const response = await fetch(inventoryAPI, { method: "get" });
  //     const outItem = await response.json();

  //     if (outItem) {
  //       setInventory(outItem.filter((e) => e.desc !== ""));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fetchPeople = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/api/auth/users",
  //       { method: "get" }
  //     );
  //     const listPeople = await response.json();

  //     if (listPeople) {
  //       setPeople(listPeople.filter((e) => e.userType !== "admin"));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fetchReturn = async () => {
  //   try {
  //     const response = await fetch(getReturnAPI, { method: "get" });
  //     const returnItems = await response.json();

  //     if (returnItems) {
  //       setReturnItem(returnItems.filter((e) => e.desc !== ""));
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // const fetchEquipment = async () => {
  //   try {
  //     const response = await fetch(equipmentAPI, { method: "get" });
  //     const outItem = await response.json();

  //     if (outItem) {
  //       setEquipment(outItem.filter((e) => e.desc !== ""));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fetchInItem = async () => {
  //   try {
  //     const response = await fetch(getInAPI, { method: "get" });
  //     const inItem = await response.json();

  //     if (inItem) {
  //       setInItem(inItem.filter((e) => e.desc !== "" || e.total !== ""));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fetchVerification = async () => {
  //   try {
  //     const response = await api.get(`/api/auth/user/${user?._id}`);

  //     if (response) {
  //       setVerified(response.data.verified);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <DataContext.Provider
      value={{
        user,
        appState,
        setAppState,
        item,
        inventory,
        equipment,
        inItem,
        people,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
