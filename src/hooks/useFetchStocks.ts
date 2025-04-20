import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchStocks } from '../api/polygon';
import { StockApiResponse } from '../types/stock';

export const useFetchStocks = (search: string) => {
  
 const {data, isLoading, isError, fetchNextPage, isFetchingNextPage} = useInfiniteQuery<StockApiResponse>({
    queryKey: ['stocks', search],
    queryFn: ({pageParam}) => fetchStocks(search, pageParam as string | undefined),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.next_url || undefined,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });

   const stocks = data?.pages?.flatMap(page => page?.results) || [];   

  return {
    stocks,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage: Boolean(data?.pages[data.pages.length - 1]?.next_url),
    isFetchingNextPage,
  };
};