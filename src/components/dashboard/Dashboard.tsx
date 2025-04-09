import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  useTheme,
  keyframes,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FounderSlider from './FounderSlider';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255,255,255,0.2), 0 0 10px rgba(255,255,255,0.1); }
  50% { box-shadow: 0 0 20px rgba(255,255,255,0.4), 0 0 30px rgba(255,255,255,0.2); }
  100% { box-shadow: 0 0 5px rgba(255,255,255,0.2), 0 0 10px rgba(255,255,255,0.1); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(233, 69, 96, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(233, 69, 96, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(233, 69, 96, 0); }
`;

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)`,
        backgroundSize: '400% 400%',
        animation: `${gradient} 15s ease infinite`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.3) 100%)',
          zIndex: 1,
        },
      }}
    >
      <Container 
        maxWidth="xl" 
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: { xs: 4, sm: 6, md: 8 },
            color: 'white',
            textAlign: 'center',
            gap: { xs: 4, sm: 6, md: 8 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 900,
              px: { xs: 1, sm: 2 },
              textShadow: '0 4px 12px rgba(0,0,0,0.3)',
              animation: `${fadeIn} 1s ease-out, ${float} 6s ease-in-out infinite`,
              background: 'linear-gradient(45deg, #fff, #e94560)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              maxWidth: '90vw',
              wordBreak: 'break-word',
            }}
          >
            Future of Startups
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: 400,
              maxWidth: { xs: '95%', sm: '80%', md: '800px' },
              px: { xs: 1, sm: 2 },
              animation: `${fadeIn} 1s ease-out 0.2s both`,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.4,
            }}
          >
            AI-Powered Platform for Startup Success
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: { xs: 3, sm: 4, md: 5 },
              width: '100%',
              maxWidth: { xs: '100%', sm: '90%', md: '900px' },
              animation: `${fadeIn} 1s ease-out 0.3s both`,
            }}
          >
            <Paper
              elevation={0}
              onClick={() => navigate('/evaluate')}
              sx={{
                p: { xs: 3, sm: 4 },
                background: 'rgba(233, 69, 96, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: { xs: 3, sm: 4 },
                border: '1px solid rgba(233, 69, 96, 0.2)',
                cursor: 'pointer',
                animation: `${pulse} 2s infinite`,
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: { xs: '160px', sm: '180px' },
                '&:hover': {
                  transform: 'translateY(-5px)',
                  background: 'rgba(233, 69, 96, 0.15)',
                  border: '1px solid rgba(233, 69, 96, 0.3)',
                },
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#e94560', 
                  fontWeight: 700, 
                  mb: 2,
                  fontSize: { xs: '1.5rem', sm: '1.75rem' },
                }}
              >
                Evaluate Your Startup
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.5,
                }}
              >
                Get instant AI-powered analysis and actionable insights
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              onClick={() => navigate('/chat')}
              sx={{
                p: { xs: 3, sm: 4 },
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: { xs: 3, sm: 4 },
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: { xs: '160px', sm: '180px' },
                '&:hover': {
                  transform: 'translateY(-5px)',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                },
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 700, 
                  mb: 2,
                  fontSize: { xs: '1.5rem', sm: '1.75rem' },
                }}
              >
                AI Assistant
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.5,
                }}
              >
                Your 24/7 startup advisor and strategic partner
              </Typography>
            </Paper>
          </Box>

          <Box
            sx={{
              maxWidth: { xs: '95%', sm: '90%', md: '700px' },
              animation: `${fadeIn} 1s ease-out 0.4s both`,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.2rem' },
                color: 'rgba(255,255,255,0.9)',
                textAlign: 'center',
                fontStyle: 'italic',
                lineHeight: 1.8,
                mb: 2,
                px: { xs: 2, sm: 0 },
              }}
            >
              "We're building the future where every innovative idea has the power to become a successful venture."
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem' },
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              — Team ConblenAI
            </Typography>
          </Box>

          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: '90%', md: '1200px' },
              animation: `${fadeIn} 1s ease-out 0.5s both`,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: { xs: 3, sm: 4 },
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: { xs: 3, sm: 4 },
                  color: 'white',
                  fontWeight: 600,
                  textAlign: 'center',
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                Meet Our Visionaries
              </Typography>
              <FounderSlider />
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard; 