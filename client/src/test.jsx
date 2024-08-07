import React, { useState } from 'react';

const EditableTable = ({ initialData }) => {
  const [data, setData] = useState(initialData);

  const handleCellChange = (rowIndex, colIndex, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][colIndex] = value;
    setData(updatedData);
  };

  return (
    <table>
      <thead>
        <tr>
          {data[0].map((_, colIndex) => (
            <th key={colIndex}>Column {colIndex + 1}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex}>
                <input
                  type="text"
                  value={cell}
                  onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;


const handleKeyDown = (e, rowIndex, colIndex) => {
  switch (e.key) {
    case 'ArrowDown':
      if (rowIndex < data.length - 1) {
        document.querySelector(`input[data-row="${rowIndex + 1}"][data-col="${colIndex}"]`).focus();
      }
      break;
    case 'ArrowUp':
      if (rowIndex > 0) {
        document.querySelector(`input[data-row="${rowIndex - 1}"][data-col="${colIndex}"]`).focus();
      }
      break;
    case 'ArrowRight':
      if (colIndex < data[0].length - 1) {
        document.querySelector(`input[data-row="${rowIndex}"][data-col="${colIndex + 1}"]`).focus();
      }
      break;
    case 'ArrowLeft':
      if (colIndex > 0) {
        document.querySelector(`input[data-row="${rowIndex}"][data-col="${colIndex - 1}"]`).focus();
      }
      break;
    default:
      break;
  }
};