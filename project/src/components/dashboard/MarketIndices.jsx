import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box 
} from '@mui/material';
import { indianMarketIndices } from '../../services/indianStockData';

const MarketIndices = ({ market }) => {
  const indices = market === 'INDIA' ? indianMarketIndices : [];

  return (
    <Grid container spacing={2}>
      {indices.map((index) => (
        <Grid item xs={12} sm={6} key={index.symbol}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">{index.symbol}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h4">
                {index.value.toLocaleString()}
              </Typography>
              <Typography 
                variant="body1" 
                color={index.change >= 0 ? 'success.main' : 'error.main'}
              >
                {index.change >= 0 ? '+' : ''}{index.change} ({index.changePercent}%)
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default MarketIndices;