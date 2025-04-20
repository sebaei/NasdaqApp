import axios from 'axios';
import { StockApiResponse } from '../types/stock';

const API_KEY = 'baZNIoqBb9CCZfpL4PZANaqh2b7pjQy0';
const BASE_URL = 'https://api.polygon.io/v3/reference';

export const fetchStocks = async ( search: string, nextUrl?: string ): Promise<StockApiResponse> => {
  try {
  const params = new URLSearchParams({
    apiKey: API_KEY,
    limit: '40',
  });  
  if (search) params.append('search', search);
   const requestUrl =
    nextUrl ? `${nextUrl}&apiKey=${API_KEY}` :
    `${BASE_URL}/tickers?${params}`;


    
  const res = await axios.get(requestUrl);
  return res.data;
}catch (error: any) {
    if (error.response?.status === 429) {
      console.error('Rate limit exceeded. Please try again later.');
      throw new Error('Rate limit exceeded');
    }
    console.error('Error fetching data:', error.message);
    throw error;
  }
};