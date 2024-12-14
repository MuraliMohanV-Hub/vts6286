import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { stockService } from '../../services/api';
import { 
  Typography, 
  Box, 
  ToggleButtonGroup, 
  ToggleButton 
} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BarChartIcon from '@mui/icons-material/BarChart';

const StockChart = ({ market }) => {
  const [chartType, setChartType] = useState('line');
  
  const { data: stockData, isLoading } = useQuery({
    queryKey: ['stocks', market],
    queryFn: () => stockService.getStocks(market)
  });

  const handleChartTypeChange = (event, newType) => {
    if (newType !== null) {
      setChartType(newType);
    }
  };

  if (isLoading) return <div>Loading chart...</div>;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ 
          bgcolor: 'background.paper', 
          p: 2, 
          border: 1, 
          borderColor: 'grey.300',
          borderRadius: 1
        }}>
          <Typography variant="subtitle2">{label}</Typography>
          <Typography color="primary">
            Price: ${payload[0].value.toLocaleString()}
          </Typography>
          {payload[1] && (
            <Typography color="secondary">
              Change: {payload[1].value}%
            </Typography>
          )}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Stock Performance
        </Typography>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={handleChartTypeChange}
          size="small"
        >
          <ToggleButton value="line">
            <ShowChartIcon />
          </ToggleButton>
          <ToggleButton value="bar">
            <BarChartIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          {chartType === 'line' ? (
            <LineChart data={stockData?.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="symbol" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="currentPrice" 
                stroke="#1976d2" 
                name="Current Price"
                strokeWidth={2}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="changePercent" 
                stroke="#dc004e" 
                name="Change %"
                strokeWidth={2}
              />
            </LineChart>
          ) : (
            <BarChart data={stockData?.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="symbol" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                yAxisId="left"
                dataKey="currentPrice" 
                fill="#1976d2" 
                name="Current Price"
              />
              <Bar 
                yAxisId="right"
                dataKey="changePercent" 
                fill="#dc004e" 
                name="Change %"
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default StockChart;