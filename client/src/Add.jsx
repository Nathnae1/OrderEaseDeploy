import React, { useState } from 'react';
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
function Add() {
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
  const [beforeVat, setBeforeVat] = useState('');

   // Function to handle form submission
   const handleClick = async (e) => {
   
    // Create an object with the form data
    const formData = {
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

    console.log(formData);

    try {
      // Use Axios to send a POST request
      const response = await axios.post('http://localhost:5000/add', formData);

      if (response.status === 200) {
        console.log('Data submitted successfully!');
        // reset the form fields
        setRef('');
        setName('');
        setDate('');
        setBillTo('');
        setSize('');
        setDescription('');
        setQuantity('');
        setColour('');
        setPacking('');
        setUnitPrice('');
        setBeforeVat('');
      } else {
        console.error('Error submitting data to the database');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="add-identity">
        <InputField label="Ref" type="text" value={ref} onChange={(e) => setRef(e.target.value)} />
        <InputField label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <InputField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <InputField label="Bill To" type="text" value={billTo} onChange={(e) => setBillTo(e.target.value)} />
      </div>

      <div className="add-item">
        <InputField label="Size" type="text" value={size} onChange={(e) => setSize(e.target.value)} />
        <InputField label="Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <InputField label="Quantity" type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <InputField label="Colour" type="text" value={colour} onChange={(e) => setColour(e.target.value)} />
        <InputField label="Packing" type="text" value={packing} onChange={(e) => setPacking(e.target.value)} />
        <InputField label="Unit Price" type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
        <InputField label="Before Vat" type="number" value={beforeVat} onChange={(e) => setBeforeVat(e.target.value)} />
      </div>

      <button className="add-button" onClick={(e) => handleClick(e)}>Add</button>
    </>
  );
}

export default Add;