import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, Tab, Tabs } from '@mui/material';
import StockChart from './StockChart';
import PortfolioSummary from './PortfolioSummary';
import NewsWidget from './NewsWidget';
import MarketSelector from './MarketSelector';
import MarketIndices from './MarketIndices';
import StockList from './StockList';
import TradeHistory from '../trading/TradeHistory';
import { useQuery } from '@tanstack/react-query';
import { stockService } from '../../services/api';

const Dashboard = () => {
  const [selectedMarket, setSelectedMarket] = useState('INDIA');
  const [selectedTab, setSelectedTab] = useState(0);
  
  const { data: portfolio, isLoading } = useQuery({
    queryKey: ['portfolio', selectedMarket],
    queryFn: () => stockService.getPortfolio(selectedMarket)
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1">
              Dashboard
            </Typography>
            <MarketSelector 
              selectedMarket={selectedMarket} 
              onMarketChange={setSelectedMarket} 
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <MarketIndices market={selectedMarket} />
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <StockChart market={selectedMarket} />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <PortfolioSummary portfolio={portfolio?.data} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Trade Stocks" />
                <Tab label="Trade History" />
                <Tab label="Market News" />
              </Tabs>
            </Box>

            {selectedTab === 0 && <StockList market={selectedMarket} />}
            {selectedTab === 1 && <TradeHistory />}
            {selectedTab === 2 && <NewsWidget market={selectedMarket} />}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;