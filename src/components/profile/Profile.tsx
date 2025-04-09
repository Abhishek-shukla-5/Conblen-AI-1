import React from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Switch,
  useTheme,
} from '@mui/material';
import { Delete as DeleteIcon, History as HistoryIcon, Logout as LogoutIcon, Edit as EditIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useHistory } from '../../context/HistoryContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

interface ProfileProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Profile: React.FC<ProfileProps> = ({ toggleDarkMode, isDarkMode }) => {
  const { currentUser, logout } = useAuth();
  const { history, deleteHistoryItem } = useHistory();
  const theme = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          },
        }}
      >
        <Box
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <IconButton onClick={toggleDarkMode} color="primary">
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>

          <Avatar
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              bgcolor: theme.palette.primary.main,
              fontSize: '3rem',
              border: `4px solid ${theme.palette.background.paper}`,
              boxShadow: theme.shadows[3],
            }}
          >
            {currentUser?.email?.[0].toUpperCase()}
          </Avatar>

          <Box sx={{ position: 'relative' }}>
            <Typography variant="h5" align="center" gutterBottom>
              {currentUser?.email}
            </Typography>
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                top: -2,
                right: -30,
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography color="text.secondary" align="center">
            Member since {currentUser?.metadata.creationTime}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Appearance
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
              <Typography>Dark Mode</Typography>
            </Box>
            <Switch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              color="primary"
            />
          </Box>
        </Box>

        <Divider />

        <Box sx={{ p: 3 }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            fullWidth
            sx={{
              py: 1,
              borderRadius: 2,
            }}
          >
            Logout
          </Button>
        </Box>
      </Paper>

      <Box sx={{ mt: 4, mb: 6 }}>
        {/* Search History Section */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Search History
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {history.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteHistoryItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText
                  primary={item.content}
                  secondary={new Date(item.timestamp).toLocaleDateString()}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile; 