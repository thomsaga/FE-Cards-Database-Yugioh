import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Search from "./components/Search.jsx";
import Detail from "./pages/Detail.jsx";
import ContextFavorite from "./components/contexts/context-favorite.js";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const favoriteCard = React.useState(null);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ContextFavorite.Provider value={favoriteCard}>
          <ErrorBoundary>
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
              <Route path="/detail/:id" element={<Detail />} />
            </Routes>
          </ErrorBoundary>
        </ContextFavorite.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
