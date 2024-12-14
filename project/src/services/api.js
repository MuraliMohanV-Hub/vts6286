import axios from 'axios';
import { mockUsers, mockStocks, mockNews } from './mockData';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock trade history data
let mockTrades = [];
let tradeId = 1;

// Mock API implementation
const mockApi = {
  login: (credentials) => {
    return new Promise((resolve, reject) => {
      const user = mockUsers.find(
        u => u.username === credentials.username && u.password === credentials.password
      );

      if (user) {
        const token = 'mock-jwt-token-' + Math.random();
        resolve({
          data: {
            token,
            user: { ...user, password: undefined }
          }
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    });
  },

  register: (formData) => {
    return new Promise((resolve) => {
      const token = 'mock-jwt-token-' + Math.random();
      const user = {
        id: mockUsers.length + 1,
        username: formData.get('username'),
        email: formData.get('email'),
        profilePicUrl: formData.get('profilePic') 
          ? URL.createObjectURL(formData.get('profilePic'))
          : null
      };
      resolve({
        data: {
          token,
          user
        }
      });
    });
  },

  getProfile: () => {
    return Promise.resolve({
      username: 'demo',
      email: 'demo@example.com',
      bio: 'Passionate about stock trading',
      profilePicUrl: null
    });
  },

  updateProfile: (formData) => {
    return Promise.resolve({
      success: true,
      data: {
        username: formData.get('username'),
        email: formData.get('email'),
        bio: formData.get('bio'),
        profilePicUrl: formData.get('profilePic')
          ? URL.createObjectURL(formData.get('profilePic'))
          : null
      }
    });
  },

  executeTrade: (tradeData) => {
    return new Promise((resolve, reject) => {
      // Validate trade
      if (tradeData.type === 'SELL') {
        const position = mockTrades.reduce((acc, trade) => {
          if (trade.symbol === tradeData.symbol) {
            return acc + (trade.type === 'BUY' ? trade.quantity : -trade.quantity);
          }
          return acc;
        }, 0);

        if (position < tradeData.quantity) {
          reject(new Error('Insufficient shares to sell'));
          return;
        }
      }

      const trade = {
        id: tradeId++,
        ...tradeData,
        timestamp: new Date().toISOString(),
        status: 'COMPLETED'
      };

      mockTrades.push(trade);
      resolve({ data: trade });
    });
  },

  getTradeHistory: () => {
    return Promise.resolve(mockTrades);
  },

  getStocks: (market = 'US') => Promise.resolve({ data: mockStocks[market] }),
  
  getPortfolio: (market = 'US') => {
    const stocks = mockStocks[market];
    const positions = mockTrades.reduce((acc, trade) => {
      const quantity = trade.type === 'BUY' ? trade.quantity : -trade.quantity;
      acc[trade.symbol] = (acc[trade.symbol] || 0) + quantity;
      return acc;
    }, {});

    const portfolioStocks = stocks
      .map(stock => ({
        ...stock,
        shares: positions[stock.symbol] || 0
      }))
      .filter(stock => stock.shares > 0);

    return Promise.resolve({
      data: {
        totalValue: portfolioStocks.reduce((sum, stock) => sum + (stock.shares * stock.currentPrice), 0),
        cashBalance: 100000 - mockTrades.reduce((sum, trade) => {
          return sum + (trade.type === 'BUY' ? trade.totalAmount : -trade.totalAmount);
        }, 0),
        stocks: portfolioStocks
      }
    });
  },

  getNews: (market = 'US') => Promise.resolve({ data: mockNews[market] })
};

export const authService = {
  login: (credentials) => mockApi.login(credentials),
  register: (formData) => mockApi.register(formData),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const userService = {
  getProfile: () => mockApi.getProfile(),
  updateProfile: (formData) => mockApi.updateProfile(formData),
};

export const stockService = {
  getStocks: (market) => mockApi.getStocks(market),
  getStockDetails: (symbol) => mockApi.getStockDetails(symbol),
  getPortfolio: (market) => mockApi.getPortfolio(market),
  getNews: (market) => mockApi.getNews(market)
};

export const tradeService = {
  executeTrade: (tradeData) => mockApi.executeTrade(tradeData),
  getTradeHistory: () => mockApi.getTradeHistory(),
};

export default api;