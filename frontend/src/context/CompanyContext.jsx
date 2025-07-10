import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "./UserAuthContext";
import axiosInstance from "../api";

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [companys, setCompanys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
   const { user } = useAuth();

  useEffect(() => {
    const fetchCompanys = async () => {
      try {
      const token = user?.token;
    //   console.log("🚀 Token before fetchCompanys:", user?.token);
      
        const res = await axiosInstance.get("/getCompanys",{
            headers: {
          Authorization: `Bearer ${token}`, 
        },
        });
        setCompanys(res.data.companys);
        // console.log("hahaha ", companys)
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching companys:", error);
        setIsLoading(false);
      }
    };
    if (user?.token) {
      fetchCompanys();
    }
  }, [user]);


   return (
    <CompanyContext.Provider value={{ companys, isLoading }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  return useContext(CompanyContext);
};
