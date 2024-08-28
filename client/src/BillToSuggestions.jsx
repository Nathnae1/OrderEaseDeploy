import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useCompanyData } from './useCompanyData';

function BillToSuggestions({onBillToChange, billToEditChange}) {
  const {billToInfo, loading, error } = useCompanyData();

  const [inputValue, setInputValue] = useState(''); // Track input value
  const [value, setValue] = useState(null); // Track selected value

  if (loading) return console.log(loading);
  if (error) return console.log(error);

  let textLable = billToEditChange ? "Bill To Change" : "Bill To";

  return (
    <div className="suggest-billTo">
      <Autocomplete
        options={billToInfo}
        getOptionLabel={(company) => company.company_name || ''} // Handle cases where company might be undefined or not have a compnay name
        
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // When freeSolo, newValue might be a string
            setValue({
              "id": 1,
              "company_name": newValue,
              "region": "",
              "city": "",
              "tin": "",
              "contact_person": "",
              "phone_number": "",
              "email_address": "",
              "website_url": "",
              "address": "",
              "industry_sector": "",
              "parent_company": ""
                });
          } else {
            setValue(newValue);
          }

          setInputValue(newValue ? (typeof newValue === 'string' ? newValue : newValue.company_name) : ''); // Update inputValue when an item is selected
          if (onBillToChange) {
            onBillToChange(newValue); // Call the callback function with the new value
          }
          if (billToEditChange) {
            billToEditChange(newValue);
          }
        }}

        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue); // Update inputValue on input change
          // Optionally, you can handle custom behavior here
          // For instance, setting value to a custom input if it doesn't match any suggestions
        }}
        
        renderInput={(params) => <TextField {...params}  variant="outlined" label={textLable} />}

        freeSolo // Allows free text input
      />
    </div>
  );
}

export default BillToSuggestions;