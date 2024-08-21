import axios from "axios";
import { useState, useEffect } from "react";
import './QuotationStyle.css'

function Quotation() {
  const [id, setId] = useState('');
  const [qoDate, setSelectedqoDate] = useState('');
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isFailedReq, setIsFailedReq] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // Track which row is being edited

  useEffect(() => {
    // Function to format the date as YYYY-MM-DD
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // Set the current date
    const today = new Date();
    setSelectedqoDate(formatDate(today));
  }, []);

  const handleFetch = async () => {
    try {
      const selectedDate = new Date(qoDate);
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');

      const response = await axios.get(`http://localhost:5000/get_quotation/${id}?year=${year}&month=${month}`);
      setData(response.data);
      setIsFailedReq(false);
    } catch (error) {
      setIsFailedReq(true);
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    const calculateTotal = () => {
      const totalBeforeVAT = data.reduce((acc, row) => acc + (parseFloat(row.BeforeVAT) || 0), 0);
      setTotal(totalBeforeVAT);
    };

    calculateTotal();
  }, [data]);

  const handleChange = (e, index, field) => {
    const { value } = e.target;
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], [field]: value };

    // Calculate BeforeVAT if UnitPrice or QTY changes
    if (field === 'UnitPrice' || field === 'QTY') {
      const unitPrice = parseFloat(updatedData[index].UnitPrice) || 0;
      const qty = parseFloat(updatedData[index].QTY) || 0;
      updatedData[index].BeforeVAT = unitPrice * qty;
    }

    setData(updatedData);
  };

  const handleSave = async (index) => {
    const updatedRow = data[index];
    try {
      await axios.put(`http://localhost:5000/update_quotation/${updatedRow.id}`, updatedRow);
      setEditingIndex(null);
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete_quotation/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error.message);
    }
  };

  return (
    <>
      <div>
        {isFailedReq && <div>Error fetching data: Request failed with status code 404</div>}
      </div>
      {!isFailedReq && (
        <div>
          <div className="get-top-section">
            <p>Ref No: {data.length > 0 ? data[0].refNum : ''}</p>
            <p>Date: {data.length > 0 ? data[0].Date.split('T')[0] : ''}</p>
            <p>Name: {data.length > 0 ? data[0].Name : ''}</p>
          </div>
          <div className="get-bill-to">
            <p>Bill To: {data.length > 0 ? data[0].BillTo : ''}</p>
          </div>

          <div className="table-container">
            <div className="quotation-table">
              {data.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Size</th>
                      <th>Description</th>
                      <th>QTY</th>
                      <th>Colour</th>
                      <th>Packing</th>
                      <th>Unit Price</th>
                      <th>Before VAT</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((quotation, index) => (
                      <tr key={quotation.id}>
                        <td className="no">{index + 1}</td>
                        <td className="size">
                          {editingIndex === index ? (
                            <input
                              type="text"
                              value={quotation.Size}
                              onChange={(e) => handleChange(e, index, 'Size')}
                            />
                          ) : (
                            quotation.Size
                          )}
                        </td>
                        <td className="description">
                          {editingIndex === index ? (
                            <input
                              type="text"
                              value={quotation.Description}
                              onChange={(e) => handleChange(e, index, 'Description')}
                            />
                          ) : (
                            quotation.Description
                          )}
                        </td>
                        <td className="qty">
                          {editingIndex === index ? (
                            <input
                              type="number"
                              value={quotation.QTY}
                              onChange={(e) => handleChange(e, index, 'QTY')}
                            />
                          ) : (
                            quotation.QTY
                          )}
                        </td>
                        <td className="colour">
                          {editingIndex === index ? (
                            <input
                              type="text"
                              value={quotation.Colour}
                              onChange={(e) => handleChange(e, index, 'Colour')}
                            />
                          ) : (
                            quotation.Colour
                          )}
                        </td>
                        <td className="packing">
                          {editingIndex === index ? (
                            <input
                              type="text"
                              value={quotation.Packing}
                              onChange={(e) => handleChange(e, index, 'Packing')}
                            />
                          ) : (
                            quotation.Packing
                          )}
                        </td>
                        <td className="unit-price">
                          {editingIndex === index ? (
                            <input
                              type="number"
                              value={quotation.UnitPrice}
                              onChange={(e) => handleChange(e, index, 'UnitPrice')}
                            />
                          ) : (
                            quotation.UnitPrice
                          )}
                        </td>
                        <td className="before-vat">
                          {editingIndex === index ? (
                            <input
                              type="number"
                              value={quotation.BeforeVAT}
                              readOnly
                            />
                          ) : (
                            quotation.BeforeVAT
                          )}
                        </td>
                        <td className="actions">
                          {editingIndex === index ? (
                            <>
                              <button onClick={() => handleSave(index)}>Save</button>
                              <button onClick={() => setEditingIndex(null)}>Cancel</button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => setEditingIndex(index)}>Edit</button>
                              <button className="item-delete" onClick={() => handleDelete(quotation.id)}>Delete</button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>
          

          <div>
            <p>Total Before VAT: {total}</p>
            <p>VAT: {(total * 0.15).toFixed(2)}</p>
            <p>Total including VAT: {(total * 1.15).toFixed(2)}</p>
          </div>
          
          <label>Select Date</label>
          <input type="date" value={qoDate} onChange={(e) => setSelectedqoDate(e.target.value)}  />

          <label>Input Pro number</label>
          <input type="text" value={id} placeholder="Enter no" onChange={(e) => setId(e.target.value)}/>
          <button onClick={handleFetch}>Fetch</button>
        </div>
      )}
    </>
  );
}

export default Quotation;
