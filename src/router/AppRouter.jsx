import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layout/MainLayout';

// Pages
// NOTE: We assume these components exist in the '../pages' directory structure
import HomePage from '../pages/HomePage';
import BrowsePage from '../pages/BrowsePage';
import DetailPage from '../pages/DetailPage';
import SearchPage from '../pages/SearchPage';
import NotFoundPage from '../pages/NotFoundPage';
// import AuthPage from '../pages/AuthPage'; // Placeholder for login/register if needed

/**
 * AppRouter component manages the routing configuration for the application.
 * It uses MainLayout to provide persistent elements (like Header/Footer) across content routes.
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/*
          Content Routes (Wrapped in MainLayout)
          The <Route element={<MainLayout />} /> acts as a wrapper for all child routes,
          ensuring the navigation bar and general layout persist.
        */}
        <Route element={<MainLayout />}>
          
          {/* Main Landing Page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Browse Pages (Categorized browsing) */}
          <Route path="/browse" element={<BrowsePage category="trending" />} />
          <Route path="/movies" element={<BrowsePage category="movie" />} />
          <Route path="/tv-shows" element={<BrowsePage category="tv" />} />
          
          {/* Search Results */}
          <Route path="/search" element={<SearchPage />} />

          {/* Details Page: Expects content type (movie/tv) and ID */}
          <Route path="/details/:type/:id" element={<DetailPage />} />

          {/* Common Redirects */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          
          {/* Catch-all Route for 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* 
          Authentication Routes (If they require a different layout, e.g., no header)
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
        */}

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;