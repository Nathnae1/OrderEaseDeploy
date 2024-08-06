import React, { useEffect, useState } from 'react';
import axios from 'axios';

// InputField component for rendering input fields
function InputField({ label, type = 'text', value, onChange }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
}

// Add component for the form
function AddDisp() {
  // State variables for each input field
  const [ref, setRef] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [billTo, setBillTo] = useState('');
  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [colour, setColour] = useState('');
  const [packing, setPacking] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [beforeVat, setBeforeVat] = useState(0);

  //Full line Data
  const [fullData, setFullData] = useState([{ ref: '', name: '', date: '', billTo: '', size: '', description: '', quantity: '', colour: '', packing: '', unitPrice: '', beforeVat: '' }]);

   // Function to handle form submission
   const handleClick = async (e) => {
   

    console.log(fullData);

    try {
      // use the slice method to exclude the first index
      const dataToSend = fullData.slice(1);
      // Use Axios to send a POST request
      const response = await axios.post('http://localhost:5000/add', dataToSend);

      if (response.status === 200) {
        console.log('Data submitted successfully!');
        // reset the form fields
        setRef('');
        setName('');
        setDate('');
        setBillTo('');
      } else {
        console.error('Error submitting data to the database');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {

    let temp = parseFloat(unitPrice) * 100;
    temp = (temp * parseInt(quantity)) / 100;

    setBeforeVat(temp);

  },[unitPrice])
  

  const addSingleItem = (e) => {

    // Create an object for the single Data
    let newSingleData = {
      ref,
      name,
      date,
      billTo,
      size,
      description,
      quantity,
      colour,
      packing,
      unitPrice,
      beforeVat
    };

    

    setFullData((prevItems) => [...prevItems, newSingleData]);

    console.log(newSingleData);
    console.log(fullData);

    setSize('');
    setDescription('');
    setQuantity('');
    setColour('');
    setPacking('');
    setUnitPrice('');
  

  }

  return (
    <>
      

      <div className="add-identity">
        <InputField label="Ref" type="text" value={ref} onChange={(e) => setRef(e.target.value)} />
        <InputField label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <InputField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <InputField label="Bill To" type="text" value={billTo} onChange={(e) => setBillTo(e.target.value)} />
      </div>

      <div className="top-section">
        <p>top section</p>
      </div>

      <div>
      {fullData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>refNum</th>
              <th>Name</th>
              <th>Date</th>
              <th>Bill To</th>
              <th>Size</th>
              <th>Description</th>
              <th>QTY</th>
              <th>Colour</th>
              <th>Packing</th>
              <th>Unit Price</th>
              <th>Before VAT</th>
            </tr>
          </thead>
          <tbody>
            {fullData.map((quotation, index) => (
              <tr key={index}>
                <td>{quotation.ref}</td>
                  <td>{quotation.name}</td>
                  <td>{quotation.date}</td>
                  <td>{quotation.billTo}</td>
                  <td>{quotation.size}</td>
                  <td>{quotation.description}</td>
                  <td>{quotation.quantity}</td>
                  <td>{quotation.colour}</td>
                  <td>{quotation.packing}</td>
                  <td>{quotation.unitPrice}</td>
                  <td>{quotation.beforeVat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available. Please add </p>
      )}
      </div>

      <div className="add-item">
        <InputField label="Size" type="text" value={size} onChange={(e) => setSize(e.target.value)} />
        <InputField label="Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <InputField label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <InputField label="Colour" type="text" value={colour} onChange={(e) => setColour(e.target.value)} />
        <InputField label="Packing" type="text" value={packing} onChange={(e) => setPacking(e.target.value)} />
        <InputField label="Unit Price" type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
      </div>

      <button className="submit-button" onClick={(e) => addSingleItem(e)}>Add Item</button> 

      <button className="submit-button" onClick={(e) => handleClick(e)}>Add Data</button>
    </>
  );
}

export default AddDisp;