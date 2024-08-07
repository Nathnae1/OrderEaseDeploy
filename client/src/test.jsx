import React, { useState } from 'react';

const EditableTable = ({ fullData }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedRow, setEditedRow] = useState(null);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedRow({ ...fullData[index] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRow((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    fullData[editIndex] = editedRow;
    setEditIndex(null);
  };

  const handleCancelClick = () => {
    setEditIndex(null);
  };

  return (
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
              <tr key={index} onClick={() => handleEditClick(index)}>
                <td>{index + 1}</td>
                {editIndex === index ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="billTo"
                        value={editedRow.billTo}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="size"
                        value={editedRow.size}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="description"
                        value={editedRow.description}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="quantity"
                        value={editedRow.quantity}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="colour"
                        value={editedRow.colour}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="packing"
                        value={editedRow.packing}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="unitPrice"
                        value={editedRow.unitPrice}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="beforeVat"
                        value={editedRow.beforeVat}
                        onChange={handleInputChange}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{quotation.billTo}</td>
                    <td>{quotation.size}</td>
                    <td>{quotation.description}</td>
                    <td>{quotation.quantity}</td>
                    <td>{quotation.colour}</td>
                    <td>{quotation.packing}</td>
                    <td>{quotation.unitPrice}</td>
                    <td>{quotation.beforeVat}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available. Please add</p>
      )}
      {editIndex !== null && (
        <div>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default EditableTable;