import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './SalesOrderPrintStyle.css'; // Add custom styles for printing

function SalesOrderPrint() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const year = queryParams.get('year');
  

  const { soId } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [hasPrinted, setHasPrinted] = useState(false); // Add a flag to track printing

  // Clear the flag after the user enters the /print page:
  useEffect(() => {
    localStorage.removeItem('SalesOrderPrint'); // Clear the programmatic access flag
  }, []);

  useEffect(() => {
    const fetchSalesOrder = async () => {
      try {
        const response = await axios.get(`https://ordereasedeploy-backend.onrender.com/get_sales_order/${soId}?year=${year}`);
        setData(response.data);
        console.log('This from print ', response.data);
      } catch (error) {
        console.error('Error fetching quotation:', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSalesOrder();
  }, [soId]);

  useEffect(() => {
    const calculateTotal = () => {
      const totalBeforeVAT = data.reduce((acc, row) => acc + (parseFloat(row.BeforeVAT) || 0), 0);
      setTotal(totalBeforeVAT);
    };

    if (data.length > 0) {
      calculateTotal();
    }
  }, [data]);

  // Trigger print dialog only after total is calculated
  useEffect(() => {
    if (!isLoading && data.length > 0 && total > 0 && !hasPrinted) {
      window.print();
      setHasPrinted(true); // Ensure print is triggered only once
    }
  }, [isLoading, data, total, hasPrinted]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data.length > 0 && <div className="print-container">
        <div>
          <h3>Sales Order</h3>
        </div>
        <div className="top-right-info">
          <p>Ref No: {data[0].soRefNum}</p>
          <p>Date: {data[0].soDate.split('T')[0]}</p>
          <p>Name: {data[0].Name}</p>
        </div>
        <div className="bill-to">
          <h2>Bill To: {data[0].BillTo}</h2>
        </div>

        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Size</th>
              <th>Description</th>
              <th>Item Code</th>
              <th>Colour</th>
              <th>Volt</th>
              <th>Unit</th>
              <th>Qty</th>
              <th>Packing</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.Size}</td>
                <td>{item.itemDescription}</td>
                <td>{item.itemCode}</td>
                <td>{item.Colour}</td>
                <td>{item.Volt}</td>
                <td>{item.Unit}</td>
                <td>{item.QTY}</td>
                <td>{item.Packing}</td>
                <td>{item.UnitPrice}</td>
                <td>{item.BeforeVAT}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bottom-section">
          <div className="tolerance-note">
            <p>Signature: _________________</p>
            <p>Delivered items are subject to +/-5% manufacturing tolerance</p>
  
          </div>

          <div className="total-prices">
            <p>Total Before VAT: {total}</p>
            <p>VAT: {(total * 0.15).toFixed(2)}</p>
            <p>Total including VAT: {(total * 1.15).toFixed(2)}</p>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default SalesOrderPrint;
