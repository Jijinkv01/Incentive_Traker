import React from 'react'
import { useRecord } from '../context/RecordContext'
import { useEffect, useState } from 'react'
import SearchBy from "../components/SearchBy"
import axiosInstance from '../api'
import { useAuth } from '../context/UserAuthContext'

const DisplayRecords = () => {
  const { records, isLoadingRecords, fetchRecords, page, totalPages } = useRecord()
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { user } = useAuth()


  const handleDelete = async (id) => {
    try {
      const token = user?.token;
      await axiosInstance.delete(`/deleteRecord/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      fetchRecords(page, debouncedSearch || "");
    } catch (error) {
      console.error("Error deleting record:", error);
    }

  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 2000);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // ✅ Fetch data only when `debouncedSearch` changes
  useEffect(() => {
    fetchRecords(1, debouncedSearch);
  }, [debouncedSearch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };



  if (isLoadingRecords) return <p className="text-center mt-4">Loading companys...</p>;


  return (
    <div className="p-2">
      <SearchBy searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 md:px-4 py-2 border">Sl. No</th>
              <th className="px-2 md:px-4 py-2 border">Date</th>
              <th className="px-2 md:px-4 py-2 border">Depot</th>
              <th className="px-2 md:px-4 py-2 border">Company</th>
              <th className="px-2 md:px-4 py-2 border">Outlet Name</th>
              <th className="px-2 md:px-4 py-2 border">Amount</th>
              <th className="px-2 md:px-4 py-2 border">Manager Name</th>
              <th className="px-2 md:px-4 py-2 border">Remarks</th>
              <th className="px-2 md:px-4 py-2 border">Action</th>


            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record, index) => (
                <tr key={record._id} className={`text-center ${index % 2 === 0 ? 'bg-gray-300' : 'bg-white'} `}>
                  <td className="border px-2 md:px-4 py-2">{(page - 1) * 5 + index + 1}</td>
                  <td className="border px-2 md:px-4 py-2">
                    {new Date(record.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="border px-2 md:px-4 py-2">{record.depotId?.name}</td>
                  <td className="border px-2 md:px-4 py-2">{record.companyId?.name}</td>
                  <td className="border px-2 md:px-4 py-2">{record.outletName}</td>
                  <td className="border px-2 md:px-4 py-2">{record.calculatedAmount}</td>
                  <td className="border px-2 md:px-4 py-2">{record.managerName}</td>
                  <td className="border px-2 md:px-4 py-2">{record.remark}</td>
                  <td className="border px-2 md:px-4 py-2">
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this record?")) {
                          handleDelete(record._id);
                        }
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          disabled={page <= 1}
          onClick={() => fetchRecords(page - 1, searchTerm)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => fetchRecords(page + 1, searchTerm)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default DisplayRecords