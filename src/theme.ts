import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Common theme settings
const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Vibrant light mode palette
          primary: {
            main: '#4361ee', // Vibrant blue
            light: '#6594ff',
            dark: '#1939b7',
          },
          secondary: {
            main: '#fb5607', // Vibrant orange
            light: '#ff8438',
            dark: '#c32c00',
          },
          success: {
            main: '#06d6a0', // Bright teal
          },
          error: {
            main: '#ef476f', // Bright pink-red
          },
          warning: {
            main: '#ffd166', // Bright yellow
          },
          info: {
            main: '#118ab2', // Ocean blue
          },
          background: {
            default: '#f8f9fa',
            paper: '#ffffff',
          },
        }
      : {
          // Vibrant dark mode palette
          primary: {
            main: '#4cc9f0', // Bright cyan
            light: '#83fdff',
            dark: '#0098bd',
          },
          secondary: {
            main: '#f72585', // Hot pink
            light: '#ff61b3',
            dark: '#bf005b',
          },
          success: {
            main: '#06d6a0', // Bright teal
          },
          error: {
            main: '#ef476f', // Bright pink-red
          },
          warning: {
            main: '#ffd166', // Bright yellow
          },
          info: {
            main: '#118ab2', // Ocean blue
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
        }),
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    }
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          padding: '10px 20px',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
          },
          '&:active': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
        },
        containedPrimary: {
          backgroundImage: mode === 'light' 
            ? 'linear-gradient(135deg, #4361ee 0%, #3a56e4 100%)' 
            : 'linear-gradient(135deg, #4cc9f0 0%, #3db8dd 100%)',
        },
        containedSecondary: {
          backgroundImage: mode === 'light'
            ? 'linear-gradient(135deg, #fb5607 0%, #f44d00 100%)'
            : 'linear-gradient(135deg, #f72585 0%, #e3237b 100%)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'box-shadow 0.3s ease-in-out',
        },
        elevation1: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        },
        elevation3: {
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          backgroundImage: mode === 'light'
            ? 'linear-gradient(90deg, #4361ee 0%, #3a56e4 100%)'
            : 'linear-gradient(90deg, #3a0ca3 0%, #4361ee 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          overflow: 'hidden',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'box-shadow 0.2s',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            },
            '&.Mui-focused': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'background-color 0.2s, transform 0.2s',
          '&:hover': {
            transform: 'translateX(5px)',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked': {
            '& + .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: mode === 'light' ? '#4361ee' : '#4cc9f0',
            },
          },
        },
      },
    },
  },
});

export const lightTheme = getTheme('light');
export const darkTheme = getTheme('dark');

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366F1',
      light: '#818CF8',
      dark: '#4F46E5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#EC4899',
      light: '#F472B6',
      dark: '#DB2777',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8FAFC',
      paper: '#ffffff',
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '1rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #6366F1, #4F46E5)',
          '&:hover': {
            background: 'linear-gradient(45deg, #4F46E5, #6366F1)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #EC4899, #DB2777)',
          '&:hover': {
            background: 'linear-gradient(45deg, #DB2777, #EC4899)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
        elevation1: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
        elevation2: {
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        },
        elevation3: {
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        },
        elevation4: {
          boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

export default theme; 