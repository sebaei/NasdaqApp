import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import StockGrid from "../components/StockGrid";

const mockStocks = [{ ticker: "AAPL", name: "Apple Inc." }];

describe("StockGrid component", () => {
  test("renders stock cards for each stock", () => {
    render(<StockGrid stocks={mockStocks} />);

    // Check ticker
    expect(screen.getByText("AAPL")).toBeInTheDocument();

    // Check name
    expect(screen.getByText("Apple Inc.")).toBeInTheDocument();
  });

  test("renders nothing when no stocks are passed", () => {
    render(<StockGrid stocks={undefined} />);
    expect(screen.queryByText(/ticker/i)).not.toBeInTheDocument();
  });
});
