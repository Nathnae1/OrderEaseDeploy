import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useCableData } from './useCableData'; // Adjust the path as needed

const Suggest = ({ onValueChange }) => {
  const { itemsDetail, loading, error } = useCableData();
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="suggest-size">
      <Autocomplete
        options={itemsDetail}
        getOptionLabel={(item) => item.size || ''}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setInputValue(newValue ? (typeof newValue === 'string' ? newValue : newValue.size) : '');
          if (onValueChange) {
            onValueChange(newValue);
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
        freeSolo
      />
    </div>
  );
};

export default Suggest;