import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { useSalesData } from './useSalesData';
import './SalesInputSelection.css';

function SalesInput({ onSalesInfo }) {
  const { salesInfo, loading, error } = useSalesData();
  const [value, setValue] = useState(null); // Track selected value

  // Handle loading state
  if (loading) return <div><CircularProgress /> Loading...</div>;
  
  // Handle error state
  if (error) return <div>Error: {error.message}</div>;

  const handleChange = (event, selectedSales) => {
    setValue(selectedSales);
    if (onSalesInfo) {
      onSalesInfo(selectedSales);
    }
  };

  return (
    <div className="suggest-sales-person">
      <Autocomplete
        options={salesInfo || []}
        getOptionLabel={(sales) => sales.first_name || ''}
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} variant="outlined" label="Name" />}
        noOptionsText="No sales info available" // Message when no options are available

      />
    </div>
  );
}

export default SalesInput;
