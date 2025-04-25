import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCryptoData = createAsyncThunk('crypto/fetchCryptoData', async () => {
  const res = await axios.get('https://crypto-price-tracker-app-ecn5.onrender.com/api/crypto');
  return res.data.data; 
});

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
        state.assets = [];
        state.error = action.error.message;
      });
  },
});

export const { updateRandomData } = cryptoSlice.actions;
export default cryptoSlice.reducer;