import React from 'react';
import { Box, Typography, Avatar, keyframes } from '@mui/material';

import image1 from '../../assets/222.jpg';
import image2 from '../../assets/333.jpg';
import image3 from '../../assets/final4.jpg';
import image4 from '../../assets/llll.jpg';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const founders = [
  {
    name: 'Abhishek Shukla',
    role: 'Founder',
    image: image4,
  },
  {
    name: 'Amaan Qureshi',
    role: 'Co-Founder',
    image: image1,
  },
  {
    name: 'Yash Yadav',
    role: 'Co-Founder',
    image: image2,
  },
  {
    name: 'Hariom kumar Sahu',
    role: 'Co-founder',
    image: image3,
  },
];

const FounderSlider: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        },
        gap: { xs: 4, sm: 4, md: 6 },
        px: { xs: 1, sm: 2, md: 4 },
      }}
    >
      {founders.map((founder, index) => (
        <Box
          key={founder.name}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: `${fadeIn} 0.6s ease-out ${index * 0.2}s both`,
          }}
        >
          <Avatar
            src={founder.image}
            alt={founder.name}
            sx={{
              width: { xs: 100, sm: 120, md: 160 },
              height: { xs: 100, sm: 120, md: 160 },
              border: '4px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              animation: `${float} 6s ease-in-out ${index * 1.5}s infinite`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                border: '4px solid rgba(255,255,255,0.4)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
              },
            }}
          />
          <Typography
            variant="h6"
            sx={{
              mt: { xs: 1, sm: 2 },
              fontSize: { xs: '1rem', sm: '1.25rem' },
              color: 'white',
              fontWeight: 600,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              textAlign: 'center',
              px: 1,
            }}
          >
            {founder.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              color: 'rgba(255,255,255,0.8)',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              textAlign: 'center',
            }}
          >
            {founder.role}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default FounderSlider; 