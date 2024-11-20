import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SalesOrderFetch() {  

  const [soId, setSoId] = useState('');
  const [soDate, setSelectedsoDate] = useState();

  const [soData, setSoData] = useState([]); // State to hold the fetched data

  const [isLoading, setIsLoading] = useState(true); // State to manage loading state

  
  const [editingIndex, setEditingIndex] = useState(null); // Track which row is being edited

  const [total, setTotal] = useState(0);

  
  // hook to calculate the total
  useEffect(() => {
    const calculateTotal = () => {
      const totalBeforeVAT = soData.reduce((acc, row) => acc + (parseFloat(row.BeforeVAT) || 0), 0);
      setTotal(totalBeforeVAT);
    };

    calculateTotal();
  }, [soData]);
 
  const handleSoFetch = async () => {
    try {
      const selectedDate = new Date(soDate);
      const year = selectedDate.getFullYear();

      const response = await axios.get(`http://localhost:5000/get_sales_order/${soId}?year=${year}`);
      setSoData(response.data)
      
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  return (
    <div>
      {soData.length > 0 && <div className='fetched-so-container'>
        <div className="get-top-section">
                <p>Ref No: {soData[0].soRefNum}</p>
                {/* <p>Date: {formatDate(new Date())}</p> */}
                <p>Name: {soData[0].Name}</p>
                <p>TIN: {soData[0].tin}</p>
        </div>

        <div className="table-container">
            <div className="quotation-table">
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
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {soData.map((soItem, index) => (
                        <tr key={soItem.id}>
                          <td className="no">{index + 1}</td>
                          <td className="size">
                            {editingIndex === index ? (
                              <input
                                type="text"
                                value={soItem.Size}
                                onChange={(e) => handleChange(e, index, 'Size')}
                              />
                            ) : (
                              soItem.Size
                            )}
                          </td>
                          
                          <td className="description">
                            {editingIndex === index ? (
                              <input
                                type="text"
                                value={soItem.Description}
                                onChange={(e) => handleChange(e, index, 'Description')}
                              />
                            ) : (
                              soItem.itemDescription
                            )}
                          </td>

                          <td className="itemCode">
                            {editingIndex === index ? (
                              <input
                                type="text"
                                value={soItem.itemCode}
                                onChange={(e) => handleChange(e, index, 'itemCode')}
                              />
                            ) : (
                              soItem.itemCode
                            )}
                          </td>

                          <td className="colour">
                            {editingIndex === index ? (
                              <input
                                type="text"
                                value={soItem.Colour}
                                onChange={(e) => handleChange(e, index, 'Colour')}
                              />
                            ) : (
                              soItem.Colour
                            )}
                          </td>

                          <td className="voltage">
                            {editingIndex === index ? (
                              <input
                                type="text"
                                value={soItem.voltage}
                                onChange={(e) => handleChange(e, index, 'voltage')}
                              />
                            ) : (
                              soItem.Volt
                            )}
                          </td>
                          
                          <td className="unit">
                            {editingIndex === index ? (
                              <input
                                type="text"
                                value={soItem.unit}
                                onChange={(e) => handleChange(e, index, 'unit')}
                              />
                            ) : (
                              soItem.Unit
                            )}
                          </td>

                          <td className="qty">
                            {editingIndex === index ? (
                              <input
                                type="number"
                                value={soItem.QTY}
                                onChange={(e) => handleChange(e, index, 'QTY')}
                              />
                            ) : (
                              soItem.QTY
                            )}
                          </td>

                          <td className="packing">
                            {editingIndex === index ? (
                              <input
                                type="text"
                                value={soItem.Packing}
                                onChange={(e) => handleChange(e, index, 'Packing')}
                              />
                            ) : (
                              soItem.Packing
                            )}
                          </td>
                          <td className="unit-price">
                            {editingIndex === index ? (
                              <input
                                type="number"
                                value={soItem.UnitPrice}
                                onChange={(e) => handleChange(e, index, 'UnitPrice')}
                              />
                            ) : (
                              soItem.UnitPrice
                            )}
                          </td>
                          <td className="before-vat">
                            {editingIndex === index ? (
                              <input
                                type="number"
                                value={soItem.BeforeVAT}
                                readOnly
                              />
                            ) : (
                              soItem.BeforeVAT
                            )}
                          </td>
                          <td className="actions">
                            {editingIndex === index ? (
                              <>
                                <button onClick={() => handleSave(soItem.id, index)}>Save</button>
                                <button onClick={() => setEditingIndex(null)}>Cancel</button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => setEditingIndex(index)}>Edit</button>
                                <button className="item-delete" onClick={() => handleDelete(soItem.id, index)}>Delete</button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

            </div>
          </div> 

          <div>
                <p>Total Before VAT: {total}</p>
                <p>VAT: {(total * 0.15).toFixed(2)}</p>
                <p>Total including VAT: {(total * 1.15).toFixed(2)}</p>
          </div>  
      </div> }

      <div className='so-fetching-container'>
        <label>Select Date</label>
        <input type="date" value={soDate} onChange={(e) => setSelectedsoDate(e.target.value)}  />.

        <label>Input Sales Order number</label>
        <input type="text" value={soId} placeholder="Enter no" onChange={(e) => setSoId(e.target.value)}/>
        <button onClick={handleSoFetch}>Fetch</button>
      </div>

    </div>
  );
}

export default SalesOrderFetch;
