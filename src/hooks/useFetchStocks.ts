import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchStocks } from '../api/polygon';
import { StockApiResponse } from '../types/stock';

const LIMIT = 40;
const Page = 1

export const useFetchStocks = (search: string) => {
  
  return useInfiniteQuery<StockApiResponse>({
    queryKey: ['stocks', search],
    queryFn: ({ pageParam }) => fetchStocks(search, pageParam as string | undefined),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.next_url || undefined,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
};