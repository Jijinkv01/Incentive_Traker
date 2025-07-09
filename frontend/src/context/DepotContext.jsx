import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "./UserAuthContext";

const DepotContext = createContext();

export const DepotProvider = ({ children }) => {
  const [depots, setDepots] = useState([]);
  const [loading, setLoading] = useState(true);
   const { user } = useAuth();

  useEffect(() => {
    const fetchDepots = async () => {
      try {
      const token = user?.token;
      // console.log("🚀 Token before fetchDepots:", user?.token);
      
        const res = await axios.get("http://localhost:8000/getDepots",{
            headers: {
          Authorization: `Bearer ${token}`, 
        },
        });
        setDepots(res.data.depots);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching depots:", error);
        setLoading(false);
      }
    };
    if (user?.token) {
      fetchDepots();
    }
  }, [user]);


   return (
    <DepotContext.Provider value={{ depots, loading }}>
      {children}
    </DepotContext.Provider>
  );
};

export const useDepot = () => {
  return useContext(DepotContext);
};