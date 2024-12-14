import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box 
} from '@mui/material';

const MarketSelector = ({ selectedMarket, onMarketChange }) => {
  return (
    <Box sx={{ minWidth: 200, mb: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="market-select-label">Market</InputLabel>
        <Select
          labelId="market-select-label"
          id="market-select"
          value={selectedMarket}
          label="Market"
          onChange={(e) => onMarketChange(e.target.value)}
        >
          <MenuItem value="US">US Market</MenuItem>
          <MenuItem value="INDIA">Indian Market</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default MarketSelector;