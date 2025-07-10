import React from 'react'
import { useDepot } from '../context/DepotContext'
import { useCompany } from '../context/CompanyContext';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useAuth } from '../context/UserAuthContext';
import axiosInstance from '../api'


const Input = () => {
  const {user} = useAuth()
  const { depots, loading } = useDepot()
  const { companys, isLoading } = useCompany()

  const [selectedDepot, setSelectedDepot] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("")
  const [outletName, setOutletName] = useState("")
  const [managerName, setManagerName] = useState("")
  const [billAmount, setBillAmount] = useState("")
  const [percentage, setPercentage] = useState("")
  const [remark, setRemark] = useState("")
  const [calculatedAmount, setCalculatedAmount] = useState(0)
  const [date, setDate] = useState("")


  useEffect(() => {
    const totalAmount =
      (parseFloat(billAmount) * parseFloat(percentage)) / 100;

    // Ensure it's not NaN
    if (!isNaN(totalAmount)) {
      setCalculatedAmount(totalAmount.toFixed(2)); // Optional: Round to 2 decimals
    } else {
      setCalculatedAmount("");
    }
  }, [billAmount, percentage]);

  const handleSubmit = async (e) => {
    e.preventDefault()
      if (!selectedDepot) return alert("Select a Dipot")
      if (!selectedCompany) return alert("Select a Company")
      if (!outletName) return alert("Enter Outlet Name")
      if (!managerName) return alert("Enter Manager Name")
      if (!billAmount) return alert("Enter Bill Amount")
      if (!percentage) return alert("Enter Percentage")
      if (!remark) return alert("Enter Remark")
      if (!calculatedAmount) return alert("Calculate Total Amount")
      if (!date) return alert("Select Date")

      const selectedDate = new Date(date);
      const today = new Date();
      // Clear time portion of today for accurate comparison
      // today.setHours(0, 0, 0, 0);
      if (selectedDate > today) {
        return alert("Date should not be in the future");
      }

    const newRecord = {
      depotId: selectedDepot,
      companyId: selectedCompany,
      outletName,
      managerName,
      billAmount: parseFloat(billAmount),
      percentage: parseFloat(percentage),
      calculatedAmount: parseFloat(calculatedAmount),
      remark,
      date,
    };
    console.log(newRecord)
    try {
      const token = user?.token;
      const res = await axiosInstance.post("/addRecord", newRecord , {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      alert(res.data.message)
      setSelectedDepot("");
      setSelectedCompany("");
      setOutletName("");
      setManagerName("");
      setBillAmount("");
      setPercentage("");
      setCalculatedAmount(0);
      setRemark("");
      setDate("");

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to add record.");
    }
  }



  if (loading) return <p>Loading depots...</p>;
  if (isLoading) return <p>Loading companys...</p>;

  return (
    <div className='flex flex-col justify-center items-center py-10'>
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 justify-center items-center'>
          <select
            value={selectedDepot}
            onChange={(e) => setSelectedDepot(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option disabled hidden value="">Select Depot</option>
            {depots.map((depot) => (
              <option key={depot._id} value={depot._id}>
                {depot.name}
              </option>
            ))}
          </select>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option disabled hidden value="">Select Company</option>
            {companys.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
          <input type="text" onChange={(e) => setOutletName(e.target.value)} value={outletName} placeholder='Enter Outlet Name' className='border rounded-lg p-1' />
          <input type="text" onChange={(e) => setManagerName(e.target.value)} value={managerName} placeholder='Enter Manager Name' className='border rounded-lg p-1' />
          <input type="number" onChange={(e) => setBillAmount(e.target.value)} value={billAmount} placeholder='Enter Bill Amount' className='border rounded-lg p-1' />
          <input type="number" onChange={(e) => setPercentage(e.target.value)} value={percentage} placeholder='Enter percentage (%)' className='border rounded-lg p-1' />
          <input type="text" onChange={(e) => setRemark(e.target.value)} value={remark} placeholder='Remark (Bill No. & date)' className='border rounded-lg h-12' />
          <h1 className='font-bold text-2xl'>Amount- ₹{calculatedAmount}</h1>
          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" placeholder='Select date ' className='border rounded-lg' />

          <button className='bg-blue-500 p-2 cursor-pointer rounded-2xl w-40'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Input
