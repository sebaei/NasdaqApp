import React, { useEffect, useRef, useState } from 'react';
import { useFetchStocks } from '../hooks/useFetchStocks';
import StockGrid from '../components/StockGrid';
import useDebounce from '../hooks/useDebounce';
import "../styles/Explore.scss" 
import Header from '../components/Header';

const Explore = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [allStocks, setAllStocks] = useState<any>([]);
  const debouncedSearch = useDebounce(search, 750)
 const { stocks, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchStocks(debouncedSearch);

  
  const [darkMode, setDarkMode] = useState(false);

  
  
  const loaderRef = useRef(null);

  const handleSearch = (value: string) => {
    setPage(1);
    setAllStocks([]);
    setSearch(value);
  };

//   const handleSearch = () => {
// console.log('Search');
//   };

  // useEffect(() => {
  //   if (data?.pages?.[0]?.results.length) {
  //     setAllStocks(data?.pages?.[0]?.results)
  //   }
  // }, [data, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {threshold: 1.0 }
    );

    const currentRef = loaderRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);



return (
     <div className={`explore-container ${darkMode ? 'dark' : ''}`}>
      <Header
        onSearch={handleSearch}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(prev => !prev)}
      />

      <StockGrid stocks={stocks} />

      <div ref={loaderRef} className="loader-space" />
    </div>
  );
}

export default Explore;
