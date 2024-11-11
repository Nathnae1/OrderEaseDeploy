import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useCableData } from './useCableData';


const Suggest = ({onValueChange, currentRowIndex}) => {

  const {itemsDetail, loading, error } = useCableData();

  const [inputValue, setInputValue] = useState(''); // Track input value
  const [value, setValue] = useState(null); // Track selected value

  if (loading) return console.log(loading);
  if (error) return console.log(error);

  return (
    <div className="suggest-size">
      <Autocomplete
        options={itemsDetail}
        getOptionLabel={(item) => item.size || ''} // Handle cases where item might be undefined or not have a size
        
        value={value}
        onChange={(event, newValue) => {
          console.log('entering value');
          if (typeof newValue === 'string') {
            // When freeSolo, newValue might be a string
            setValue({
              "iditems": "",
              "size": newValue,
              "itemDescription": "",
              "price": ""
                });
          } else {
            setValue(newValue);
          }

          setInputValue(newValue ? (typeof newValue === 'string' ? newValue : newValue.size) : ''); // Update inputValue when an item is selected
          if (onValueChange) {
            onValueChange(newValue, currentRowIndex); // Call the callback function with the new value
          }
        }}

        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue); // Update inputValue on input change
          // Optionally, you can handle custom behavior here
          // For instance, setting value to a custom input if it doesn't match any suggestions
        }}

        renderInput={(params) => <TextField {...params}  variant="outlined" />}

        freeSolo // Allows free text input
      />
    </div>
  );
};

export default Suggest;