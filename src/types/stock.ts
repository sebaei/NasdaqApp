export interface Stock {
  ticker: string;
  name: string;
}

export interface StockApiResponse {
  results: Stock[];
  status: string;
  count: number;
  next_url?: string;
}