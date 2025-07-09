import React, { createContext, useState, useEffect, useContext,useCallback } from "react";
import axios from "axios";
import { useAuth } from "./UserAuthContext";

const RecordContext = createContext();

export const RecordProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();

 const fetchRecords = useCallback(async (currentPage = 1, search = "") => {
  try {
    setIsLoadingRecords(true);
    const token = user?.token;
    const res = await axios.get(
      `https://incentive-traker-backend.onrender.com/getRecords?page=${currentPage}&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setRecords(res.data.records);
    setTotalPages(res.data.totalPages);
    setPage(currentPage);
  } catch (error) {
    console.error("Error fetching records:", error);
  } finally {
    setIsLoadingRecords(false);
  }
}, [user?.token]); // Only depends on token

  // ✅ Now it's safe to use fetchRecords here
  useEffect(() => {
    if (user?.token) {
      fetchRecords(1);
    }
  }, [user]);


  return (
    <RecordContext.Provider value={{ records, isLoadingRecords, fetchRecords, page, totalPages }}>
      {children}
    </RecordContext.Provider>
  );
};

export const useRecord = () => {
  return useContext(RecordContext);
};
