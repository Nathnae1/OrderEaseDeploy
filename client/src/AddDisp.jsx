import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Suggest from './Suggest';

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
  let itemIndex = 0;

  const [itemData, setItemData] = useState('');

  //Full line Data
  const [fullData, setFullData] = useState([{ ref: '', name: '', date: '', billTo: '', size: '', description: '', quantity: '', colour: '', packing: '', unitPrice: '', beforeVat: '' }]);

  // data keys
const dataKeys = ['ref','name', 'date','billTo','size', 'description', 'quantity','colour','packing', 'unitPrice','beforeVat'];

  // Checking data submisssion is succefull
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Checking if isPreview to print true
  const [printPreview, setPrintPreview] = useState(false);

   // Function to handle form submission
   const handleClick = async (e) => {
   

    console.log(fullData);

    try {
      // Check the data before sending to server
      const dataToSend = fullData;
      // Use Axios to send a POST request
      const response = await axios.post('http://localhost:5000/add', dataToSend);

      if (response.status === 200) {
        console.log('Data submitted successfully!');
        setIsSubmitted(true);
        // Set a timeout to hide the success message after 10 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 2000);

        // reset the form fields
        setRef('');
        setName('');
        // setDate('');
        setBillTo('');
        setFullData([{ ref: '', name: '', date: '', billTo: '', size: '', description: '', quantity: '', colour: '', packing: '', unitPrice: '', beforeVat: '' }]);
        itemIndex = 0;

      } else {
        console.error('Error submitting data to the database');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Get the last reference number of the quotation
  useEffect(() => {
    fetch('http://localhost:5000/get_ref')
      .then(response => response.json())
      .then(refData => {
        setRef(++refData[0].refNum);
        console.log(refData[0].refNum); });

        // Function to format the date as YYYY-MM-DD
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };

        // Set the current date
        const today = new Date();
        setDate(formatDate(today));
  }, []);
  

  const addSingleItem = (e) => {

    // Create new empty data
    const newSingleData = [{ ref: '', name: '', date: '', billTo: '', size: '', description: '', quantity: '', colour: '', packing: '', unitPrice: '', beforeVat: '' }];

    setFullData((prevItems) => [...prevItems, ...newSingleData]);
    console.log(fullData);

  }

  // Table handle cell change
  const handleCellChange = (rowIndex, colIndex, value) => {
    
    const updatedData = [...fullData];
    
    let tempKey = dataKeys[colIndex];
    updatedData[rowIndex][tempKey] = value;

    console.log(`See me ${ updatedData[rowIndex][tempKey]}`);

    if(tempKey == 'unitPrice' || tempKey == 'quantity'){
      let temp = parseFloat(updatedData[rowIndex].unitPrice) * 100;
      temp = (temp * parseInt(updatedData[rowIndex].quantity)) / 100;

      updatedData[rowIndex].beforeVat = temp;
    }

    setFullData(updatedData);
    console.log(fullData);

  }

  // Get the data from size input
  const handleSizeChange = (newValue, currentRowIndex)=> {
      setItemData(newValue);
      console.log('Parent the value is :',newValue);
      console.log('Current index', currentRowIndex);
      console.log('Parent the value is :',itemData);

      if (newValue) {
        if (newValue.size && newValue.desc && newValue.price) {
          let refKey = dataKeys[0];
          let nameKey = dataKeys[1];
          let dateKey = dataKeys[2];
          let billToKey = dataKeys[3];
          let descKey = dataKeys[5];
          let priceKey = dataKeys[9];
          
          setFullData((data) => {

              data[currentRowIndex][descKey] = newValue.desc;
              data[currentRowIndex][priceKey] = newValue.price;

              data[currentRowIndex][refKey] = ref;
              data[currentRowIndex][nameKey] = name;
              data[currentRowIndex][dateKey] = date;
              data[currentRowIndex][billToKey] = billTo;
              
              return data; 
            });
        }
      }

      console.log('The values are', ref, name, date, billTo);

  };

  // Handle the deletion of a single row
  const handleDeleteRow = (rowIndex) => {
    const newData = fullData.filter((row, index) => index !== rowIndex);
    setFullData(newData);
  }



  return (
    <div className="add-item-container">
      <div className="top-section">
        {isSubmitted && <div className="success-message"> Data submitted successfully! </div>}
      </div>
      
      <div className="add-identity">
        <InputField label="Ref" type="text" value={ref} onChange={(e) => setRef(e.target.value)} />
        <InputField label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} /> 
        <InputField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <InputField label="Bill To" type="text" value={billTo} onChange={(e) => setBillTo(e.target.value)} />
      </div>

      <div className="table-input">
        <table>
            <thead>
              <tr>
                <th>No.</th>
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

              {fullData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.keys(row).map((cell, colIndex) => (
                    colIndex === 0 ? (
                      <td key={colIndex}>{++itemIndex}</td>
                    ) : colIndex === 4 ? (
                      <td key={colIndex}>
                          <Suggest currentRowIndex = {rowIndex} onValueChange={handleSizeChange}/>
                      </td>
                    ) : colIndex === 1 || colIndex === 2 || colIndex === 3  ? (
                      ''
                    ) : colIndex === 10 ? (
                      <td key={colIndex}>{row[dataKeys[colIndex]]}</td>
                    ) : (
                      <td key={colIndex}>
                        <input 
                          type="text" 
                          value={row[dataKeys[colIndex]]}
                          onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                        />
                      </td>
                    )
                    
                  ))}
                  <td key={Object.keys(row).length}>
                    <button onClick={() => handleDeleteRow(rowIndex)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}     
            
            </tbody>
        </table>
      </div>
    
      <div className="add-btn-container">
        <button className="submit-button" onClick={(e) => addSingleItem(e)}>Add Item</button> 

        <button className="submit-button" onClick={(e) => handleClick(e)}>Add Data</button>
      </div>

    </div>
  );
}

export default AddDisp;