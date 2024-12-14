import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Alert
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tradeService } from '../../services/api';

const TradeForm = ({ stock }) => {
  const [tradeData, setTradeData] = useState({
    type: 'BUY',
    quantity: 1,
    price: stock?.currentPrice || 0
  });
  const queryClient = useQueryClient();

  const tradeMutation = useMutation({
    mutationFn: (data) => tradeService.executeTrade(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['portfolio']);
      setTradeData({ ...tradeData, quantity: 1 });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    tradeMutation.mutate({
      ...tradeData,
      symbol: stock.symbol,
      totalAmount: tradeData.quantity * tradeData.price
    });
  };

  return (
    <Paper elevation={3} className="p-4">
      <Typography variant="h6" gutterBottom>
        Trade {stock?.symbol}
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Trade Type</InputLabel>
          <Select
            value={tradeData.type}
            label="Trade Type"
            onChange={(e) => setTradeData({ ...tradeData, type: e.target.value })}
          >
            <MenuItem value="BUY">Buy</MenuItem>
            <MenuItem value="SELL">Sell</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Quantity"
          type="number"
          value={tradeData.quantity}
          onChange={(e) => setTradeData({ ...tradeData, quantity: parseInt(e.target.value) })}
          inputProps={{ min: 1 }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Price"
          type="number"
          value={tradeData.price}
          onChange={(e) => setTradeData({ ...tradeData, price: parseFloat(e.target.value) })}
          InputProps={{ readOnly: true }}
        />

        <Box className="mt-4">
          <Typography variant="body1" gutterBottom>
            Total Amount: ${(tradeData.quantity * tradeData.price).toFixed(2)}
          </Typography>
        </Box>

        {tradeMutation.isError && (
          <Alert severity="error" className="my-2">
            {tradeMutation.error.message}
          </Alert>
        )}

        {tradeMutation.isSuccess && (
          <Alert severity="success" className="my-2">
            Trade executed successfully!
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="mt-4"
          disabled={tradeMutation.isLoading}
        >
          {tradeMutation.isLoading ? 'Processing...' : 'Execute Trade'}
        </Button>
      </form>
    </Paper>
  );
};

export default TradeForm;