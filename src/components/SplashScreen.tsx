import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Fade, useMediaQuery, useTheme } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import StarIcon from '@mui/icons-material/Star';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

interface SplashScreenProps {
  darkMode: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ darkMode }) => {
  const [progress, setProgress] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 200);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          bgcolor: darkMode ? 'background.default' : 'primary.main',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: darkMode 
            ? 'radial-gradient(circle, #3a0ca3 0%, #121212 100%)' 
            : 'radial-gradient(circle, #5a73f2 0%, #4361ee 100%)',
          p: { xs: 2, sm: 3, md: 4 }
        }}
      >
        {/* Floating decorative elements - positioned responsively */}
        <Box sx={{ 
          position: 'absolute', 
          top: { xs: '10%', sm: '15%' }, 
          left: { xs: '10%', sm: '15%' }, 
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
            '100%': { transform: 'translateY(0px)' },
          },
          display: { xs: 'none', sm: 'block' }
        }}>
          <StarIcon sx={{ fontSize: { xs: 20, sm: 25, md: 30 }, opacity: 0.6 }} />
        </Box>
        
        <Box sx={{ 
          position: 'absolute', 
          top: { xs: '15%', sm: '20%' }, 
          right: { xs: '15%', sm: '20%' }, 
          animation: 'float2 8s ease-in-out infinite',
          '@keyframes float2': {
            '0%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
            '100%': { transform: 'translateY(0px)' },
          },
          animationDelay: '1s',
          display: { xs: 'none', sm: 'block' }
        }}>
          <BubbleChartIcon sx={{ fontSize: { xs: 25, sm: 35, md: 40 }, opacity: 0.4 }} />
        </Box>
        
        <Box sx={{ 
          position: 'absolute', 
          bottom: { xs: '10%', sm: '15%' }, 
          right: { xs: '20%', sm: '25%' }, 
          animation: 'float3 7s ease-in-out infinite',
          '@keyframes float3': {
            '0%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-15px)' },
            '100%': { transform: 'translateY(0px)' },
          },
          animationDelay: '0.5s',
          display: { xs: 'none', md: 'block' }
        }}>
          <StarIcon sx={{ fontSize: { xs: 20, sm: 25 }, opacity: 0.5 }} />
        </Box>
        
        <Box sx={{ 
          position: 'absolute', 
          bottom: { xs: '20%', sm: '25%' }, 
          left: { xs: '15%', sm: '20%' }, 
          animation: 'float4 9s ease-in-out infinite',
          '@keyframes float4': {
            '0%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-25px)' },
            '100%': { transform: 'translateY(0px)' },
          },
          animationDelay: '1.5s',
          display: { xs: 'none', md: 'block' }
        }}>
          <AutoGraphIcon sx={{ fontSize: { xs: 25, sm: 30, md: 35 }, opacity: 0.6 }} />
        </Box>
        
        {/* Main content with animations */}
        <Box sx={{ 
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.1)' },
            '100%': { transform: 'scale(1)' },
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <LightbulbIcon sx={{ 
            fontSize: { xs: 60, sm: 80, md: 100 }, 
            mb: { xs: 2, sm: 3 },
            color: darkMode ? '#f72585' : 'white',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.7))',
          }} />
          
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 700,
              background: darkMode 
                ? 'linear-gradient(45deg, #f72585 0%, #4cc9f0 100%)' 
                : 'linear-gradient(45deg, #ffffff 0%, #f8f9fa 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3))',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              textAlign: 'center'
            }}
          >
            ConblenAI
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: { xs: 3, sm: 4 },
              opacity: 0.9,
              textAlign: 'center',
              maxWidth: { xs: '95%', sm: '80%' },
              fontWeight: 400,
              letterSpacing: 1,
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            Validate your startup ideas with AI
          </Typography>
        </Box>
        
        <Box 
          sx={{ 
            position: 'relative',
            mt: { xs: 1, sm: 2 },
            animation: 'rotate 10s linear infinite',
            '@keyframes rotate': {
              'from': { transform: 'rotate(0deg)' },
              'to': { transform: 'rotate(360deg)' },
            }
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            size={isMobile ? 60 : isTablet ? 70 : 80}
            thickness={2}
            sx={{ 
              opacity: 0.3,
              position: 'absolute',
              top: 0,
              left: 0,
              color: darkMode ? '#f72585' : 'white',
            }}
          />
          <CircularProgress
            variant="determinate"
            value={progress}
            size={isMobile ? 60 : isTablet ? 70 : 80}
            thickness={4}
            sx={{ 
              color: darkMode ? '#4cc9f0' : 'white',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
              borderRadius: '50%',
            }}
          />
        </Box>
      </Box>
    </Fade>
  );
};

export default SplashScreen; 