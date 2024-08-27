import React, { useEffect, useState, useCallback } from 'react';
import Suggest from './Suggest';
import BillToSuggestions from './BillToSuggestions';

function EditAddItem({noOfItems, identityData}) {
  // State variables for each input field
  const [ref, setRef] = useState(identityData.ref);
  const [name, setName] = useState(identityData.name);
  const [date, setDate] = useState(identityData.date);
  const [billTo, setBillTo] = useState(identityData.billTo);
  const [size, setSize] = useState('');
  const [salesId, setSalesId] = useState('');

  const [itemData, setItemData] = useState('');

  //Full line Data
  const [AddData, setAddData] = useState([{ ref: '',salesRepId: '', name: '', date: '', billTo: '', size: '', description: '', quantity: '', colour: '', packing: '', unitPrice: '', beforeVat: '' }]);

  // data keys
  const dataKeys = ['ref','salesRepId','name', 'date','billTo','size', 'description', 'quantity','colour','packing', 'unitPrice','beforeVat'];

  // Table handle cell change
  const handleCellChange = (rowIndex, colIndex, value) => {
    
    const updatedData = [...AddData];
    
    let tempKey = dataKeys[colIndex];
    updatedData[rowIndex][tempKey] = value;

    console.log(`See me ${ updatedData[rowIndex][tempKey]}`);

    if(tempKey == 'unitPrice' || tempKey == 'quantity'){
      let temp = parseFloat(updatedData[rowIndex].unitPrice) * 100;
      temp = (temp * parseInt(updatedData[rowIndex].quantity)) / 100;

      updatedData[rowIndex].beforeVat = temp;
    }

    setAddData(updatedData);
    console.log(updatedData);

  }

  const [prevNoOfItems, setPrevNoOfItems] = useState(noOfItems);

  useEffect(() => {
    if (noOfItems > prevNoOfItems) {
      const newSingleData = [{ ref: '', salesRepId: '', name: '', date: '', billTo: '', size: '', description: '', quantity: '', colour: '', packing: '', unitPrice: '', beforeVat: '' }];
      setAddData(prevItems => [...prevItems, ...newSingleData]);
    }
    if (noOfItems === 0) {
      setAddData([]);
    }
    setPrevNoOfItems(noOfItems);
  }, [noOfItems, prevNoOfItems]);

  // Get the data from size input
  const handleSizeChange = (newValue, currentRowIndex)=> {
    setItemData(newValue);
    if (newValue) {
      if (newValue.size && newValue.desc && newValue.price) {
        let refKey = dataKeys[0];
        let salesIdKey = dataKeys[1];
        let nameKey = dataKeys[2];
        let dateKey = dataKeys[3];
        let billToKey = dataKeys[4];
        let sizeKey = dataKeys[5];
        let descKey = dataKeys[6];
        let priceKey = dataKeys[10];
        
        setAddData((data) => {

            data[currentRowIndex][sizeKey] = newValue.size;
            data[currentRowIndex][descKey] = newValue.desc;
            data[currentRowIndex][priceKey] = newValue.price;

            data[currentRowIndex][refKey] = ref;
            data[currentRowIndex][salesIdKey] = salesId;
            data[currentRowIndex][nameKey] = name;
            data[currentRowIndex][dateKey] = date;
            data[currentRowIndex][billToKey] = billTo;
            
            return data; 
          });
      }
    }

    if(currentRowIndex === 0) {
      setSize(newValue.size);
    }

    console.log('The values are', ref, name, date, billTo);

  };

  // Handle the deletion of a single row
  const handleDeleteRow = (rowIndex) => {
    const newData = AddData.filter((row, index) => index !== rowIndex);
    setAddData(newData);
  }

  return (
    <>
      {AddData.length > 0 && <div>
        <h1>Adding in Quo Section</h1>
      </div>}

      {AddData.length > 0 && <div className="table-input">
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
                  <th className="before-vat">Before VAT</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>

                {AddData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.keys(row).map((cell, colIndex) => (
                      colIndex === 0 ? (
                        <td key={colIndex}>{colIndex}</td>
                      ) : colIndex === 5 ? (
                        <td key={colIndex}>
                            <Suggest currentRowIndex = {rowIndex} onValueChange={handleSizeChange}/>
                        </td>
                      ) : colIndex === 1 || colIndex === 2 || colIndex === 3 || colIndex === 4  ? (
                        ''
                      ) : colIndex === 11 ? (
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
                      <button className="item-delete" onClick={() => handleDeleteRow(rowIndex)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}     
              
              </tbody>
        </table>
      </div>}
    </>
  );
}


export default EditAddItem;