import { createContext, useState, useEffect } from "react";
import localApi from "../API/Api";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [appState, setAppState] = useState(null);

  const fetchUser = async () => {
    let responseUser = await localApi.get("user");
    setUser(responseUser.data);
  };

  useEffect(() => {
    if(sessionStorage.length < 1){
      fetchUser();
    }
  }, [appState]);


  return (
    <DataContext.Provider
      value={{
        user,
        appState,
        setAppState,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
