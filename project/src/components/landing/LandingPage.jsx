import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Container maxWidth="lg">
        <Box className="py-20 text-center">
          <TrendingUpIcon sx={{ fontSize: 60, color: 'primary.main', mb: 4 }} />
          <Typography variant="h2" component="h1" gutterBottom>
            Virtual Stock Trader
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Experience the thrill of stock trading without the risk.
            Practice with virtual money in real market conditions.
          </Typography>
          <Box className="mt-8 space-x-4">
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </Box>
        </Box>

        <Box className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <Paper elevation={3} className="p-6 text-center">
            <Typography variant="h6" gutterBottom>
              Real-Time Data
            </Typography>
            <Typography color="text.secondary">
              Access live market data from US and Indian stock markets
            </Typography>
          </Paper>

          <Paper elevation={3} className="p-6 text-center">
            <Typography variant="h6" gutterBottom>
              Portfolio Tracking
            </Typography>
            <Typography color="text.secondary">
              Monitor your investments and track performance in real-time
            </Typography>
          </Paper>

          <Paper elevation={3} className="p-6 text-center">
            <Typography variant="h6" gutterBottom>
              Market Analysis
            </Typography>
            <Typography color="text.secondary">
              Advanced charts and technical analysis tools
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;