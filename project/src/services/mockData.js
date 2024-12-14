import { indianStocks, indianMarketNews } from './indianStockData';

export const mockUsers = [
  {
    id: 1,
    username: 'demo',
    password: 'demo123', // In a real app, passwords would be hashed
    name: 'Demo User',
    email: 'demo@example.com'
  }
];

export const usStocks = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 10,
    currentPrice: 175.43,
    change: 2.15,
    changePercent: 1.24
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 5,
    currentPrice: 142.89,
    change: -0.75,
    changePercent: -0.52
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 8,
    currentPrice: 338.11,
    change: 4.23,
    changePercent: 1.27
  }
];

export const mockStocks = {
  US: usStocks,
  INDIA: indianStocks
};

export const mockNews = {
  US: [
    {
      id: 1,
      title: 'Market Rally Continues as Tech Stocks Surge',
      summary: 'Major tech companies lead market gains amid positive earnings reports.',
      url: '#',
      date: '2024-03-15'
    },
    {
      id: 2,
      title: 'Federal Reserve Announces Interest Rate Decision',
      summary: 'Fed maintains current rates, signals potential changes in coming months.',
      url: '#',
      date: '2024-03-14'
    },
    {
      id: 3,
      title: 'New Regulations Impact Trading Markets',
      summary: 'Recent policy changes affect market dynamics and trading patterns.',
      url: '#',
      date: '2024-03-13'
    }
  ],
  INDIA: indianMarketNews
};