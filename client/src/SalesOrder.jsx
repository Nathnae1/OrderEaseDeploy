import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function SalesOrder() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const qoToSoRef = queryParams.get('qoToSo'); // Get the reference number from the query params
  const dateQo = queryParams.get('selectedDate'); // Get the reference number from the query params
  const selectedRows = queryParams.get('selectedRowsID'); // Get the reference number from the query params

  console.log('This is from SO', qoToSoRef, 'and selected rows', selectedRows);

  // State to hold extracted year and month
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [quotationData, setQuotationData] = useState(null); // State to hold the fetched data
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    if (dateQo) {
      // Parse the date string to a Date object
      const date = new Date(dateQo);

      // Check if the date is valid
      if (!isNaN(date.getTime())) {
        // Extract the year and month
        const extractedYear = date.getFullYear();
        const extractedMonth = date.getMonth() + 1; // getMonth() is zero-based, so we add 1

        setYear(extractedYear);
        setMonth(extractedMonth);
      } else {
        console.error("Invalid date format:", dateQo);
      }
    }
  }, [dateQo]);

  useEffect(() => {
    // Fetch the latest Quotation Data when the relevant data changes
    const fetchQuotationData = async () => {

      if (qoToSoRef && year && month && selectedRows) {
        try {
          setIsLoading(true); // Set loading to true before making the request
          
          // convert the selected rows to to query string
          
          console.log('this is',selectedRows);
          

          const response = await axios.get(`http://localhost:5000/get_quotation_for_so/${qoToSoRef}?year=${year}&month=${month}&filterIds=${selectedRows}`);
          setQuotationData(response.data); // Store the fetched data
          setIsLoading(false); // Set loading to false once the data is fetched
        } catch (error) {
          setError(error.message); // Capture the error message
          setIsLoading(false); // Set loading to false in case of an error
        }
      }

      if (qoToSoRef && year && month && !selectedRows) {
        try {
          setIsLoading(true); // Set loading to true before making the request
          const response = await axios.get(`http://localhost:5000/get_quotation_for_so/${qoToSoRef}?year=${year}&month=${month}`);
          setQuotationData(response.data); // Store the fetched data
          setIsLoading(false); // Set loading to false once the data is fetched
        } catch (error) {
          setError(error.message); // Capture the error message
          setIsLoading(false); // Set loading to false in case of an error
        }
      }
    };

    fetchQuotationData();
  }, [qoToSoRef, year, month]); // Fetch when qoToSoRef, year, or month changes

  return (
    <div>
      <h1>Sales Order</h1>
      <p>Reference Number: {qoToSoRef}</p>
      <p>Selected Date: {dateQo}</p>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching data: {error}</p>}
      {quotationData && (
        <div>
          <h2>Quotation Data</h2>
          <pre>{JSON.stringify(quotationData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default SalesOrder;
