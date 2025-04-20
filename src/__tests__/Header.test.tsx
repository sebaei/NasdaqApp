import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/Header";

describe("Header component", () => {
  const mockOnSearch = jest.fn();
  const mockToggleDarkMode = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
    mockToggleDarkMode.mockClear();
  });

  test("renders Nasdaq logo", () => {
    render(
      <Header
        onSearch={mockOnSearch}
        darkMode={false}
        toggleDarkMode={mockToggleDarkMode}
      />
    );
    const logo = screen.getByAltText("Nasdaq Logo");
    expect(logo).toBeInTheDocument();
  });

  test("renders search input and calls onSearch on change", () => {
    render(
      <Header
        onSearch={mockOnSearch}
        darkMode={false}
        toggleDarkMode={mockToggleDarkMode}
      />
    );
    const input = screen.getByPlaceholderText("Search by Ticker...");
    fireEvent.change(input, { target: { value: "AAPL" } });
    expect(mockOnSearch).toHaveBeenCalledWith("AAPL");
  });

  test("renders toggle button with correct text and calls toggleDarkMode on click", () => {
    const { rerender } = render(
      <Header
        onSearch={mockOnSearch}
        darkMode={true}
        toggleDarkMode={mockToggleDarkMode}
      />
    );

    const button = screen.getByRole("button", { name: /Dark Mode/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockToggleDarkMode).toHaveBeenCalled();

    // Test button text updates when toggled
    rerender(
      <Header
        onSearch={mockOnSearch}
        darkMode={false}
        toggleDarkMode={mockToggleDarkMode}
      />
    );
    expect(
      screen.getByRole("button", { name: /Light Mode/i })
    ).toBeInTheDocument();
  });
});
