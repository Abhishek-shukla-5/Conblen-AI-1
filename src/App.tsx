import React, { Suspense, lazy, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CircularProgress, Box, CssBaseline, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import NotFound from './components/NotFound';
import { HistoryProvider } from './context/HistoryContext';

// Lazy loaded components
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const IdeaEvaluator = lazy(() => import('./components/idea-evaluator/IdeaEvaluator'));
const AiAssistant = lazy(() => import('./components/ai-assistant/AiAssistant'));
const Settings = lazy(() => import('./components/settings/Settings'));

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
    
    // Show splash screen for 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  if (showSplash) {
    return <SplashScreen darkMode={darkMode} />;
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <HistoryProvider>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Container component="main" sx={{ flexGrow: 1, mt: 2, mb: 4 }}>
              <Suspense fallback={
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                  <CircularProgress />
                </Box>
              }>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/idea-evaluator" element={<IdeaEvaluator />} />
                  <Route path="/ai-assistant" element={<AiAssistant />} />
                  <Route path="/settings" element={<Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Container>
          </Box>
        </Router>
      </HistoryProvider>
    </ThemeProvider>
  );
}

export default App;
