import React from "react";
import { Stock } from "../types/stock";

const StockGrid: React.FC<{ stocks: Stock[] | undefined }> = ({ stocks }) => (
  <div className="stock-grid">
    {stocks?.map((stock: Stock, index: number) => (
      <div key={index} className="stock-card" role="button" tabIndex={0}>
        <div className="ticker">{stock.ticker}</div>
        <div className="name">{stock.name}</div>
      </div>
    ))}
  </div>
);

export default StockGrid;
