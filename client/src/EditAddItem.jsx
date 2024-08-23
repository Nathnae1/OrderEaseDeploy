import React, { useEffect, useState } from 'react';
import Suggest from './Suggest';
import BillToSuggestions from './BillToSuggestions';

function EditAddItem() {
  //Full line Data
  const [AddData, setAddData] = useState([{ ref: '',salesRepId: '', name: '', date: '', billTo: '', size: '', description: '', quantity: '', colour: '', packing: '', unitPrice: '', beforeVat: '' }]);

  // data keys
const dataKeys = ['ref','salesRepId','name', 'date','billTo','size', 'description', 'quantity','colour','packing', 'unitPrice','beforeVat'];

  // Get the data from size input
  const handleSizeChange = (newValue, currentRowIndex)=> {
    
    console.log('Parent the value is :');
  }

  return (
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
                          // onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                        />
                      </td>
                    )
                    
                  ))}
                  <td key={Object.keys(row).length}>
                    {/* <button className="item-delete" onClick={() => handleDeleteRow(rowIndex)}>
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))}     
            
            </tbody>
        </table>
  </div>
  );
}


export default EditAddItem;