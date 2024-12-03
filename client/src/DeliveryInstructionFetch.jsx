import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';




function DeliveryInstructionFetch() {

  const [diId, setDiId] = useState('');
  const [diDate, setDiSelectedDate] = useState('');
  const [diYear, setDiYear] = useState('');

  const [diData, setdiData] = useState([]); // State to hold the fetched data

  const [isLoading, setIsLoading] = useState(true); // State to manage loading state

  const [editingIndex, setEditingIndex] = useState(null); // Track which row is being edited


  const handleDiFetch = async () => {
    try {
      const selectedDate = new Date(diDate);
      const year = selectedDate.getFullYear();
      //Setting soYear for delivery Creation
      setDiYear(year);

      const response = await axios.get(`http://localhost:5000/get_delivery_instruction/${diId}?year=${year}`);
      setdiData(response.data)
      
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  const handleChange = (e, index, field) => { 

    console.log('Handle Change');
  };

  return (
    <div>
      {diData.length > 0 && <div className='fetched-di-container'>
        <div className="get-top-section">
                <p>Ref No: {diData[0].diRefNum}</p>
                {/* <p>Date: {formatDate(new Date())}</p> */}
                <p>Name: {diData[0].Name}</p>
        </div>

        <div>
          <h2>Bill To: {diData[0].BillTo}</h2>
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
                      <th>Ordered Qty</th>
                      <th>Packing</th>
                      <th>Actual length</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diData.map((soItem, index) => (
                        <tr key={soItem.id}
                          >
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
                                value={soItem.itemDescription}
                                onChange={(e) => handleChange(e, index, 'itemDescription')}
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
                                value={soItem.Volt}
                                onChange={(e) => handleChange(e, index, 'Volt')}
                              />
                            ) : (
                              soItem.Volt
                            )}
                          </td>
                          
                          <td className="unit">
                            {editingIndex === index ? (
                              <input
                                type="text"
                                value={soItem.Unit}
                                onChange={(e) => handleChange(e, index, 'Unit')}
                              />
                            ) : (
                              soItem.Unit
                            )}
                          </td>

                          <td className="ordered-qty">
                            {editingIndex === index ? (
                              <input
                                type="number"
                                value={soItem.orderedQty}
                                onChange={(e) => handleChange(e, index, 'orderedQty')}
                              />
                            ) : (
                              soItem.orderedQty
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
                          
                          <td className="delivered-qty">
                            {editingIndex === index ? (
                              <input
                                type="number"
                                value={soItem.deliveredQty}
                                onChange={(e) => handleChange(e, index, 'deliveredQty')}
                              />
                            ) : (
                              soItem.orderedQty
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
                <p>Tolerance</p>
          </div>  
      </div> }

      {diData.length === 0 && 
        <div>
          <p>No data available</p>
        </div>
      }

      <div className='so-fetching-container'>
        <label>Select Date </label>
        <input type="month" value={diDate} onChange={(e) => setDiSelectedDate(e.target.value)}  />

        <label>Input DI number</label>
        <input type="text" value={diId} placeholder="Enter no" onChange={(e) => setDiId(e.target.value)}/>
        <button onClick={handleDiFetch}>Fetch</button>
      </div>
      
      

    </div>
  );
}

export default DeliveryInstructionFetch;