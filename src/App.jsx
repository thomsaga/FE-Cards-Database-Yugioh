import React from "react";
import Search from "./components/Search.jsx";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1 className="headerFont">Yu-Gi-Oh! Cards Database</h1>
        </Link>
        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <Search />
              </div>
            }
          />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
