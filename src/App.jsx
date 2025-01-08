import React, { Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import theme from './components/Theme';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import LoadingSpinner from './components/shared/LoadingSpinner';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                </ProtectedRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
