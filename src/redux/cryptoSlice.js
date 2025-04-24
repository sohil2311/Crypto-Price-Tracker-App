import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCryptoData = createAsyncThunk('crypto/fetchCryptoData', async () => {
  const res = await axios.get('http://localhost:5000/api/crypto');
  return res.data.data;
});

// const mockData = [
//   {
//     id: 1,
//     name: 'Bitcoin',
//     symbol: 'BTC',
//     circulating_supply: 19000000,
//     quote: {
//       USD: {
//         price: 67000,
//         percent_change_1h: 0.2,
//         percent_change_24h: 1.5,
//         percent_change_7d: 3.2,
//         market_cap: 1300000000000,
//         volume_24h: 30000000000,
//       },
//     },
//   },
//   {
//     id: 1027,
//     name: 'Ethereum',
//     symbol: 'ETH',
//     circulating_supply: 120000000,
//     quote: {
//       USD: {
//         price: 3400,
//         percent_change_1h: -0.1,
//         percent_change_24h: 2.0,
//         percent_change_7d: 4.5,
//         market_cap: 400000000000,
//         volume_24h: 20000000000,
//       },
//     },
//   },
// ];

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: { assets: [], status: 'idle', error: null },
  reducers: {
    updateRandomData: (state) => {
      state.assets.forEach((asset) => {
        const rand = () => (Math.random() * 2 - 1).toFixed(2);
        asset.quote.USD.percent_change_1h += parseFloat(rand());
        asset.quote.USD.percent_change_24h += parseFloat(rand());
        asset.quote.USD.percent_change_7d += parseFloat(rand());
        asset.quote.USD.price += parseFloat(rand());
        asset.quote.USD.volume_24h += Math.random() * 1e6;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assets = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.status = 'failed';
        state.assets = action.error.message;
        state.assets = [];
      });
  },
});

export const { updateRandomData } = cryptoSlice.actions;
export default cryptoSlice.reducer;