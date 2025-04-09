import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardActions,
  Snackbar,
  Alert,
  AlertColor,
  useTheme
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

interface SettingsProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Settings: React.FC<SettingsProps> = ({ darkMode, toggleDarkMode }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');
  
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleUpgradeToPro = () => {
    setMessage('This is a demo app. Upgrade functionality is not implemented.');
    setSeverity('info');
    setOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Account
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Email" 
                secondary={currentUser?.email} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Account Type" 
                secondary="Free Tier" 
              />
            </ListItem>
          </List>
        </Paper>
        
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Appearance
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <LightModeIcon color={!darkMode ? 'primary' : 'disabled'} />
            <FormControlLabel
              control={
                <Switch 
                  checked={darkMode} 
                  onChange={toggleDarkMode}
                />
              }
              label=""
            />
            <DarkModeIcon color={darkMode ? 'primary' : 'disabled'} />
            <Typography variant="body2" sx={{ ml: 2 }}>
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </Typography>
          </Box>
        </Paper>
        
        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom sx={{ color: 'primary.main' }}>
              Upgrade to ConblenAI Pro
            </Typography>
            
            <List sx={{ mt: 1 }}>
              <ListItem>
                <ListItemText 
                  primary="Unlimited AI Assistant questions" 
                  secondary="Free tier limited to 10 questions per day" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Advanced idea evaluations" 
                  secondary="Get deeper insights and more detailed competitor analysis" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Priority support" 
                  secondary="Get help when you need it" 
                />
              </ListItem>
            </List>
            
            <Typography variant="h6" sx={{ mt: 2 }}>
              $9.99/month
            </Typography>
          </CardContent>
          <CardActions>
            <Button 
              variant="contained" 
              fullWidth
              onClick={handleUpgradeToPro}
            >
              Upgrade Now
            </Button>
          </CardActions>
        </Card>
        
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            About ConblenAI
          </Typography>
          <Typography variant="body2" paragraph>
            Version 1.0.0
          </Typography>
          <Typography variant="body2">
            ConblenAI helps entrepreneurs validate and improve their startup ideas using AI-powered analysis and personalized assistance.
          </Typography>
        </Paper>

        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ mt: 4 }}
        >
          Logout
        </Button>
      </Box>
      
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Settings; 