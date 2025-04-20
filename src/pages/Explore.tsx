import React, { useEffect, useRef, useState } from "react";
import { useFetchStocks } from "../hooks/useFetchStocks";
import StockGrid from "../components/StockGrid";
import useDebounce from "../hooks/useDebounce";
import "../styles/Explore.scss";
import Header from "../components/Header";

const Explore = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 750);
  const {
    stocks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useFetchStocks(debouncedSearch);

  const [darkMode, setDarkMode] = useState(true);

  const loaderRef = useRef(null);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = loaderRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return <div>Error fetching data.</div>;
  }

  return (
    <main className={`explore-container ${darkMode ? "dark" : ""}`}>
      <Header
        onSearch={handleSearch}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode((prev) => !prev)}
      />
      {!isLoading && stocks.length === 0 ? (
        <div className="no-results">No Stocks found.</div>
      ) : (
        <StockGrid stocks={stocks} />
      )}
      <div
        ref={loaderRef}
        className={`${isFetchingNextPage ? "loader" : ""}`}
      />
    </main>
  );
};

export default Explore;
