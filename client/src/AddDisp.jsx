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
      // use the slice method to exclude the first index
      const dataToSend = fullData.slice(1);
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

  },[fullData])
  

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

    

    if(tempKey === 'unitPrice'){
      let temp = parseFloat(updatedData[rowIndex][tempKey]) * 100;
      temp = (temp * parseInt(quantity)) / 100;

      updatedData[rowIndex].beforeVat = temp;
    }

    setFullData(updatedData);
    console.log(fullData);
    
  }

  return (
    <>
      

      

      {printPreview && <div className="print-preview">
        <div className="top-section">
          {isSubmitted && <div className="success-message"> Data submitted successfully! </div>}
        </div>

        <div className="get-top-section">
          <p>Ref No: {fullData.length > 1 ? fullData[1].ref : ''}</p>
          <p>Date: {fullData.length > 1 ? fullData[1].date.split('T')[0] : ''}</p>
          <p>Name: {fullData.length > 1 ? fullData[1].name : ''}</p>
        </div>

        <div className="get-bill-to">
          <p>Bill To: {fullData.length > 1 ? fullData[1].billTo : ''}</p>
        </div>

        <div>
        {fullData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>No.</th>
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
                    <td>{index > 0 ? index:''}</td>
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
      </div> }

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
              </tr>
            </thead>
            <tbody>



            {fullData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.keys(row).map((cell, colIndex) => (
                  colIndex === 0 ? (
                    <td key={colIndex}>{rowIndex}</td>
                  ) : colIndex === 1 || colIndex === 2 || colIndex === 3 || colIndex === 10 ? (
                    ''
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
              </tr>
            ))}
                
            
            </tbody>
          </table>
      </div>

      <div className="add-identity">
        <InputField label="Ref" type="text" value={ref} onChange={(e) => setRef(e.target.value)} />
        <InputField label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} /> 
        <InputField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <InputField label="Bill To" type="text" value={billTo} onChange={(e) => setBillTo(e.target.value)} />
      </div>

    
      <button className="submit-button" onClick={(e) => addSingleItem(e)}>Add Item</button> 

      <button className="submit-button" onClick={(e) => handleClick(e)}>Add Data</button>
    </>
  );
}

export default AddDisp;