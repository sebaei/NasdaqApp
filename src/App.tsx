import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Splash from "./pages/Splash";
import Explore from "./pages/Explore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
