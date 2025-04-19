import axios from 'axios';
import { StockApiResponse } from '../types/stock';

const API_KEY = 'baZNIoqBb9CCZfpL4PZANaqh2b7pjQy0'; // Replace with .env in production
const BASE_URL = 'https://api.polygon.io/v3/reference';

export const fetchStocks = async ( search: string, url?: string, limit = 40 ): Promise<StockApiResponse> => {
  const params = new URLSearchParams({
    active: 'true',
    market: 'stocks',
    sort: 'ticker',
    order: 'asc',
    apiKey: API_KEY,
    limit: limit.toString(),
  });  
  if (search) params.append('search', search);
   const requestUrl =
    url ? `${url}&apiKey=${API_KEY}` :
    `${BASE_URL}/tickers?${params}${search ? `&search=${search}` : ''}`;


    console.log(requestUrl);
    
  const res = await axios.get(requestUrl);
  return res.data;
};