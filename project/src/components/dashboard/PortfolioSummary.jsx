import React from 'react';
import { 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  Box
} from '@mui/material';

const PortfolioSummary = ({ portfolio }) => {
  if (!portfolio) return null;

  const { totalValue, stocks, cashBalance } = portfolio;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Portfolio Summary
      </Typography>
      <Typography variant="h4" color="primary" gutterBottom>
        ${totalValue?.toLocaleString() || '0'}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" gutterBottom>
        Cash Balance: ${cashBalance?.toLocaleString() || '0'}
      </Typography>
      <List>
        {stocks?.map((stock) => (
          <ListItem key={stock.symbol}>
            <ListItemText
              primary={stock.symbol}
              secondary={`${stock.shares} shares @ $${stock.currentPrice}`}
            />
            <Typography variant="body1" color="primary">
              ${(stock.shares * stock.currentPrice).toLocaleString()}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PortfolioSummary;