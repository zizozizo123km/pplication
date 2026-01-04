import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Utility components and services
import GlobalLoadingSpinner from './components/common/GlobalLoadingSpinner'; 
import AuthProvider from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Lazy load pages for performance
const HomePage = lazy(() => import('./pages/HomePage'));
const BrowsePage = lazy(() => import('./pages/BrowsePage'));
const DetailsPage = lazy(() => import('./pages/DetailsPage'));
const WatchPage = lazy(() => import('./pages/WatchPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ManageProfilesPage = lazy(() => import('./pages/ManageProfilesPage'));
const UserAccountPage = lazy(() => import('./pages/UserAccountPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Main Application Component
function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<GlobalLoadingSpinner />}>
          <Routes>

            {/* --- Authentication Routes (Simple Layout) --- */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>

            {/* --- Protected Routes (Require Login) --- */}
            <Route element={<PrivateRoute />}>
                
                {/* Routes using the Main Navigation Layout */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/browse" element={<BrowsePage />} />
                    <Route path="/latest" element={<BrowsePage key="latest" category="latest" />} />
                    <Route path="/my-list" element={<BrowsePage key="my-list" category="my-list" />} />
                    <Route path="/series" element={<BrowsePage key="series" mediaType="tv" />} />
                    <Route path="/movies" element={<BrowsePage key="movies" mediaType="movie" />} />
                    
                    {/* Dynamic Details Page */}
                    <Route path="/details/:mediaType/:id" element={<DetailsPage />} />
                </Route>

                {/* Routes that might be full-screen or specialized (no Header/Footer) */}
                <Route path="/watch/:mediaType/:id" element={<WatchPage />} />
                <Route path="/profiles" element={<ManageProfilesPage />} />
                <Route path="/account" element={<UserAccountPage />} />
            </Route>
            
            {/* --- Fallback Route --- */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;