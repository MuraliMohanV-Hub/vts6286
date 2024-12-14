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
  Button,
  Box
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { stockService } from '../../services/api';
import TradeForm from '../trading/TradeForm';

const StockList = ({ market }) => {
  const [selectedStock, setSelectedStock] = React.useState(null);
  
  const { data: stocks, isLoading } = useQuery({
    queryKey: ['stocks', market],
    queryFn: () => stockService.getStocks(market)
  });

  if (isLoading) return <div>Loading stocks...</div>;

  return (
    <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Paper className="md:col-span-2" elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Change</TableCell>
                <TableCell align="right">Change %</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks?.data?.map((stock) => (
                <TableRow key={stock.symbol}>
                  <TableCell>{stock.symbol}</TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell align="right">${stock.currentPrice.toFixed(2)}</TableCell>
                  <TableCell 
                    align="right"
                    className={stock.change >= 0 ? 'text-green-600' : 'text-red-600'}
                  >
                    ${Math.abs(stock.change).toFixed(2)}
                  </TableCell>
                  <TableCell 
                    align="right"
                    className={stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}
                  >
                    {stock.changePercent.toFixed(2)}%
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setSelectedStock(stock)}
                    >
                      Trade
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box>
        {selectedStock && <TradeForm stock={selectedStock} />}
      </Box>
    </Box>
  );
};

export default StockList;