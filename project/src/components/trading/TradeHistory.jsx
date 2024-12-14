import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { tradeService } from '../../services/api';
import { format } from 'date-fns';

const TradeHistory = () => {
  const { data: trades, isLoading } = useQuery({
    queryKey: ['trades'],
    queryFn: tradeService.getTradeHistory
  });

  if (isLoading) return <div>Loading trade history...</div>;

  return (
    <Paper elevation={3} className="p-4">
      <Typography variant="h6" gutterBottom>
        Trade History
      </Typography>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trades?.map((trade) => (
              <TableRow key={trade.id}>
                <TableCell>
                  {format(new Date(trade.timestamp), 'MMM dd, yyyy HH:mm')}
                </TableCell>
                <TableCell>{trade.symbol}</TableCell>
                <TableCell>
                  <Chip
                    label={trade.type}
                    color={trade.type === 'BUY' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">{trade.quantity}</TableCell>
                <TableCell align="right">${trade.price.toFixed(2)}</TableCell>
                <TableCell align="right">
                  ${(trade.quantity * trade.price).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Chip
                    label={trade.status}
                    color={trade.status === 'COMPLETED' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TradeHistory;