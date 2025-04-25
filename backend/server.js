import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());

const cache = new NodeCache({ stdTTL: 300 });

app.get('/api/crypto', async (req, res) => {
  try {
    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.API_KEY,
        },
        params: {
          start: 1,
          limit: 20,
          convert: 'USD',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from CoinMarketCap:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch data from CoinMarketCap' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
});