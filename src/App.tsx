import React, { lazy, Suspense, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HistoryProvider } from './context/HistoryContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Lazy load components
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const Login = lazy(() => import('./components/auth/Login'));
const Signup = lazy(() => import('./components/auth/Signup'));
const Profile = lazy(() => import('./components/profile/Profile'));
const Chat = lazy(() => import('./components/chat/Chat'));
const Evaluate = lazy(() => import('./components/evaluate/Evaluate'));

const LoadingSpinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

const App: React.FC = () => {
  const { currentUser } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
          primary: {
            main: '#4f46e5',
          },
          secondary: {
            main: '#ec4899',
          },
          background: {
            default: isDarkMode ? '#121212' : '#f3f4f6',
            paper: isDarkMode ? '#1e1e1e' : '#ffffff',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 600,
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 12,
              },
            },
          },
        },
      }),
    [isDarkMode]
  );

  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => {
      const newMode = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <HistoryProvider>
          <Router>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <React.Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
                    <Route path="/signup" element={currentUser ? <Navigate to="/" /> : <Signup />} />
                    <Route
                      path="/"
                      element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <PrivateRoute>
                          <Profile isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/chat"
                      element={
                        <PrivateRoute>
                          <Chat />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/evaluate"
                      element={
                        <PrivateRoute>
                          <Evaluate />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </React.Suspense>
              </Box>
            </Box>
          </Router>
        </HistoryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
