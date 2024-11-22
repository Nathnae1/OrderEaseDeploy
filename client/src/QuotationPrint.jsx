import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './PrintStyle.css'; // Add custom styles for printing

function QuotationPrint() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const year = queryParams.get('year');
  const month = queryParams.get('month');

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [total, setTotal] = useState(0);

  const [hasPrinted, setHasPrinted] = useState(false); // Add a flag to track printing

  // Clear the flag after the user enters the /print page:
  useEffect(() => {
    localStorage.removeItem('Print'); // Clear the programmatic access flag
  }, []);

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get_quotation/${id}?year=${year}&month=${month}`);
        setData(response.data);
        console.log('this from print ',response.data);
      } catch (error) {
        console.error('Error fetching quotation:', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuotation();
  }, [id]);

   // Trigger print dialog when component is rendered
   useEffect(() => {
    if (!isLoading && data.length > 0 && !hasPrinted) {
      window.print();
      setHasPrinted(true); // Ensure print is triggered only once
    }
  }, [isLoading, data, hasPrinted]);

  useEffect(() => {
    const calculateTotal = () => {
      const totalBeforeVAT = data.reduce((acc, row) => acc + (parseFloat(row.BeforeVAT) || 0), 0);
      setTotal(totalBeforeVAT);
    };

    calculateTotal();
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data.length > 0 && <div className="print-container">
        <p>Ref No: {data[0].refNum}</p>
        <p>Date: {data[0].Date}</p>
        <p>Name: {data[0].Name}</p>
        <p>Bill To: {data[0].BillTo}</p>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Size</th>
              <th>Description</th>
              <th>QTY</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.Size}</td>
                <td>{item.Description}</td>
                <td>{item.QTY}</td>
                <td>{item.UnitPrice}</td>
                <td>{item.BeforeVAT}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
            <p>Total Before VAT: {total}</p>
            <p>VAT: {(total * 0.15).toFixed(2)}</p>
            <p>Total including VAT: {(total * 1.15).toFixed(2)}</p>
        </div>
      </div>}
    </div>
  );
}

export default QuotationPrint;
