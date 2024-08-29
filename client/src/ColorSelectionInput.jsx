import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './ColorSelectionInput.css'; // Import your CSS module
import { useEffect } from 'react';

// Sample color options
const colorOptions = [
  { colorCode: '#FF0000', colorName: 'Red' },
  { colorCode: '#00FF00', colorName: 'Green' },
  { colorCode: '#0000FF', colorName: 'Blue' },
  { colorCode: '#FFFF00', colorName: 'Yellow' },
  { colorCode: '#FF00FF', colorName: 'Magenta' },
  { colorCode: '#00FFFF', colorName: 'Cyan' },
  { colorCode: '#000000', colorName: 'Black' },
  { colorCode: '#FFFFFF', colorName: 'White' },
  { colorCode: '#A52A2A', colorName: 'Brown' },
  { colorCode: '#808080', colorName: 'Gray' },
  { colorCode: '#800080', colorName: 'Purple' },
  { colorCode: '#FFC0CB', colorName: 'Pink' },
  { colorCode: '#D3D3D3', colorName: 'Light Gray' },
  { colorCode: '#C0C0C0', colorName: 'Silver' },
  { colorCode: '#FFD700', colorName: 'Gold' },
  { colorCode: '#E6E6FA', colorName: 'Lavender' },
  { colorCode: '#FF7F50', colorName: 'Coral' },
  { colorCode: '#D8BFD8', colorName: 'Thistle' },
  { colorCode: '#FFE4B5', colorName: 'Moccasin' },
  { colorCode: '#DCDCDC', colorName: 'Gainsboro' },
  { colorCode: '#FFDEAD', colorName: 'Navajo White' },
  { colorCode: '#F5F5DC', colorName: 'Beige' }
];

function ColorSelectionInput({ currentRowIndex, onColorChange }) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    // Set default value to Black when component mounts
    const defaultColor = colorOptions.find(color => color.colorName === 'Black');
    setValue(defaultColor);
  }, []);

  const handleChange = (event, colorValue) => {
    setValue(colorValue);
    if (onColorChange) {
      onColorChange(currentRowIndex,colorValue);
    }
  };

  return (
    <div className="color-selection-input">
      <Autocomplete
        options={colorOptions}
        getOptionLabel={(option) => option.colorName}
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
          />
        )}
        isOptionEqualToValue={(option, value) => option.colorCode === value.colorCode}
      />
    </div>
  );
}

export default ColorSelectionInput;
