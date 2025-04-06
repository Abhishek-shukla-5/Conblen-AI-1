import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Divider, 
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  useTheme,
  Badge,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { useHistory } from '../../context/HistoryContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { history, deleteHistoryItem } = useHistory();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleDeleteItem = async (id: string) => {
    deleteHistoryItem(id);
  };

  const handleEvaluateIdea = () => {
    navigate('/idea-evaluator');
  };

  const handleChatWithAI = () => {
    navigate('/ai-assistant');
  };

  const filterHistoryByType = (type: 'idea' | 'chat') => {
    return history.filter(item => item.type === type);
  };

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mt: { xs: 2, sm: 3, md: 4 }, mb: { xs: 4, sm: 6, md: 8 } }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: { xs: 'flex-start', sm: 'center' }, 
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: { xs: 1, sm: 2 },
            mb: { xs: 2, sm: 3, md: 4 },
            position: 'relative'
          }}
        >
          <RocketLaunchIcon sx={{ 
            fontSize: { xs: 30, sm: 35, md: 40 }, 
            color: 'primary.main',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)' },
            }
          }} />
          
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{
              fontWeight: 700,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(90deg, #4cc9f0, #f72585)'
                : 'linear-gradient(90deg, #4361ee, #fb5607)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0,0,0,0.1)',
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' }
            }}
          >
            Welcome to Your Dashboard
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: { xs: 2, sm: 3 }, 
          mb: { xs: 3, sm: 4 },
          position: 'relative',
          zIndex: 1,
        }}>
          <Card 
            sx={{ 
              flex: 1,
              position: 'relative',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
              borderRadius: { xs: 3, sm: 4 },
              overflow: 'visible',
              '&:hover': {
                transform: { xs: 'translateY(-8px)', sm: 'translateY(-12px)' },
                boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.25)'
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 5,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(to right, #4cc9f0, #4361ee)'
                  : 'linear-gradient(to right, #4361ee, #3a56e4)',
                borderRadius: '4px 4px 0 0',
                boxShadow: 'none'
              }
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
                mb: 2
              }}>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: { xs: 50, sm: 60 },
                  height: { xs: 50, sm: 60 },
                  borderRadius: '50%',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #4cc9f0 0%, #3a0ca3 100%)'
                    : 'linear-gradient(135deg, #4361ee 0%, #3a56e4 100%)',
                  boxShadow: '0 10px 20px rgba(67, 97, 238, 0.3)',
                  animation: 'pulse 2s infinite ease-in-out',
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                    '100%': { transform: 'scale(1)' }
                  },
                  mb: { xs: 2, sm: 0 }
                }}>
                  <LightbulbIcon sx={{ color: 'white', fontSize: { xs: 25, sm: 30 } }} />
                </Box>
                <Typography 
                  variant="h5" 
                  component="div" 
                  sx={{ 
                    ml: { xs: 0, sm: 2 }, 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#4cc9f0' : '#4361ee',
                    textAlign: { xs: 'center', sm: 'left' },
                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                  }}
                >
                  Evaluate Your Startup Idea
                </Typography>
              </Box>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary', 
                  mb: 2,
                  textAlign: { xs: 'center', sm: 'left' },
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                Get AI-powered feedback on your startup idea's market potential, competition, and feasibility.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: { xs: 2, sm: 3 }, pt: 0 }}>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={handleEvaluateIdea}
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  py: { xs: 1, sm: 1.5 },
                  fontWeight: 600,
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 8px 25px -5px rgba(76, 201, 240, 0.6)'
                    : '0 8px 25px -5px rgba(67, 97, 238, 0.6)',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '50px',
                    height: '100%',
                    top: 0,
                    left: '-100px',
                    backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)',
                    animation: 'shimmer 3s infinite',
                    '@keyframes shimmer': {
                      '100%': {
                        left: '100%',
                      },
                    },
                  }
                }}
              >
                Start Evaluation
              </Button>
            </CardActions>
          </Card>
          
          <Card 
            sx={{ 
              flex: 1,
              position: 'relative',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
              borderRadius: { xs: 3, sm: 4 },
              overflow: 'visible',
              '&:hover': {
                transform: { xs: 'translateY(-8px)', sm: 'translateY(-12px)' },
                boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.25)'
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 5,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(to right, #f72585, #7209b7)'
                  : 'linear-gradient(to right, #fb5607, #f44d00)',
                borderRadius: '4px 4px 0 0',
                boxShadow: 'none'
              }
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
                mb: 2
              }}>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: { xs: 50, sm: 60 },
                  height: { xs: 50, sm: 60 },
                  borderRadius: '50%',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)'
                    : 'linear-gradient(135deg, #fb5607 0%, #f44d00 100%)',
                  boxShadow: '0 10px 20px rgba(247, 37, 133, 0.3)',
                  animation: 'float 3s infinite ease-in-out',
                  '@keyframes float': {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                    '100%': { transform: 'translateY(0px)' }
                  },
                  mb: { xs: 2, sm: 0 }
                }}>
                  <ChatIcon sx={{ color: 'white', fontSize: { xs: 25, sm: 30 } }} />
                </Box>
                <Typography 
                  variant="h5" 
                  component="div" 
                  sx={{ 
                    ml: { xs: 0, sm: 2 }, 
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark' ? '#f72585' : '#fb5607',
                    textAlign: { xs: 'center', sm: 'left' },
                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                  }}
                >
                  Chat with ConblenAI
                </Typography>
              </Box>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary', 
                  mb: 2,
                  textAlign: { xs: 'center', sm: 'left' },
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                Get startup advice, brainstorm ideas, and ask questions about business strategy.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: { xs: 2, sm: 3 }, pt: 0 }}>
              <Button 
                variant="contained" 
                color="secondary"
                fullWidth 
                onClick={handleChatWithAI}
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  py: { xs: 1, sm: 1.5 },
                  fontWeight: 600,
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 8px 25px -5px rgba(247, 37, 133, 0.6)'
                    : '0 8px 25px -5px rgba(251, 86, 7, 0.6)',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '50px',
                    height: '100%',
                    top: 0,
                    left: '-100px',
                    backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)',
                    animation: 'shimmer 3s infinite',
                    '@keyframes shimmer': {
                      '100%': {
                        left: '100%',
                      },
                    },
                  }
                }}
              >
                Start Chatting
              </Button>
            </CardActions>
          </Card>
        </Box>

        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 }, 
            mb: { xs: 3, sm: 4 }, 
            borderRadius: { xs: 3, md: 4 },
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
            background: theme.palette.background.paper,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: 5,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(90deg, #4cc9f0, #f72585, #3a0ca3)'
                : 'linear-gradient(90deg, #4361ee, #fb5607, #f44d00)',
              borderRadius: '4px 4px 0 0',
              boxShadow: 'none'
            }
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              fontWeight: 600,
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}
          >
            Your History
            <Badge 
              badgeContent={history.length} 
              color="primary"
              sx={{ ml: 2 }}
            />
          </Typography>
          
          <Box 
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              '.MuiTab-root': {
                fontWeight: 600,
                transition: 'all 0.2s',
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                minWidth: { xs: 'auto', sm: 90 },
                px: { xs: 1, sm: 2 },
                '&:hover': {
                  color: theme.palette.mode === 'dark' ? '#4cc9f0' : '#4361ee',
                  transform: 'translateY(-2px)'
                }
              }
            }}
          >
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              aria-label="history tabs"
              indicatorColor={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
              textColor={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
              variant={isMobile ? "fullWidth" : "standard"}
            >
              <Tab label="All" />
              <Tab label="Idea Evaluations" />
              <Tab label="AI Chats" />
            </Tabs>
          </Box>
          
          <TabPanel value={activeTab} index={0}>
            {history.length > 0 ? (
              <List sx={{ mt: 1 }}>
                {history.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem 
                      alignItems="flex-start"
                      sx={{
                        borderRadius: 2,
                        transition: 'all 0.2s',
                        flexDirection: { xs: 'column', sm: 'row' },
                        py: { xs: 2, sm: 1 },
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255,255,255,0.05)' 
                            : 'rgba(0,0,0,0.02)',
                          transform: { xs: 'translateY(2px)', sm: 'translateX(5px)' }
                        }
                      }}
                    >
                      <Box sx={{ 
                        mr: { xs: 0, sm: 2 }, 
                        mb: { xs: 1, sm: 0 },
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: { xs: 'center', sm: 'center' },
                        p: 1,
                        borderRadius: '50%',
                        bgcolor: item.type === 'idea' 
                          ? (theme.palette.mode === 'dark' ? 'rgba(76, 201, 240, 0.1)' : 'rgba(67, 97, 238, 0.1)')
                          : (theme.palette.mode === 'dark' ? 'rgba(247, 37, 133, 0.1)' : 'rgba(251, 86, 7, 0.1)'),
                        alignSelf: { xs: 'center', sm: 'flex-start' }
                      }}>
                        {item.type === 'idea' ? (
                          <LightbulbIcon 
                            color={theme.palette.mode === 'dark' ? 'info' : 'primary'} 
                            fontSize="small" 
                          />
                        ) : (
                          <ChatIcon 
                            color={theme.palette.mode === 'dark' ? 'secondary' : 'secondary'} 
                            fontSize="small" 
                          />
                        )}
                      </Box>
                      <ListItemText
                        primary={
                          <Typography sx={{ 
                            fontWeight: 600,
                            textAlign: { xs: 'center', sm: 'left' },
                            fontSize: { xs: '0.95rem', sm: '1rem' } 
                          }}>
                            {item.content}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                              sx={{ 
                                display: 'block', 
                                mt: 0.5,
                                textAlign: { xs: 'center', sm: 'left' },
                                fontSize: { xs: '0.8rem', sm: '0.875rem' }
                              }}
                            >
                              {item.type === 'idea' ? 'Startup Idea Evaluation' : 'ConblenAI Chat'}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ textAlign: { xs: 'center', sm: 'left' }, display: { xs: 'block', sm: 'inline' } }}
                            >
                              {item.timestamp.toLocaleDateString()} • {item.timestamp.toLocaleTimeString()}
                            </Typography>
                          </>
                        }
                      />
                      <ListItemSecondaryAction sx={{ top: { xs: 8, sm: 16 } }}>
                        <IconButton 
                          edge="end" 
                          aria-label="delete" 
                          onClick={() => handleDeleteItem(item.id)}
                          sx={{
                            color: theme.palette.error.main,
                            opacity: 0.7,
                            transition: 'all 0.2s',
                            '&:hover': {
                              opacity: 1,
                              transform: 'scale(1.1)',
                              color: theme.palette.error.main,
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider component="li" sx={{ my: { xs: 0.5, sm: 1 } }} />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box 
                sx={{ 
                  mt: { xs: 3, sm: 4 }, 
                  textAlign: 'center',
                  p: { xs: 2, sm: 4 },
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.02)' 
                    : 'rgba(0,0,0,0.02)',
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  No history yet. Start by evaluating an idea or chatting with ConblenAI!
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={handleEvaluateIdea}
                    startIcon={<LightbulbIcon />}
                    sx={{ width: { xs: '100%', sm: 'auto' }, mb: { xs: 1, sm: 0 } }}
                  >
                    Evaluate Idea
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="secondary"
                    size="small"
                    onClick={handleChatWithAI}
                    startIcon={<ChatIcon />}
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                  >
                    Chat with AI
                  </Button>
                </Box>
              </Box>
            )}
          </TabPanel>
          
          <TabPanel value={activeTab} index={1}>
            {filterHistoryByType('idea').length > 0 ? (
              <List sx={{ mt: 1 }}>
                {filterHistoryByType('idea').map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem 
                      alignItems="flex-start"
                      sx={{
                        borderRadius: 2,
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255,255,255,0.05)' 
                            : 'rgba(0,0,0,0.02)',
                          transform: 'translateX(5px)'
                        }
                      }}
                    >
                      <Box sx={{ 
                        mr: 2, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        p: 1,
                        borderRadius: '50%',
                        bgcolor: theme.palette.mode === 'dark' 
                          ? 'rgba(76, 201, 240, 0.1)' 
                          : 'rgba(67, 97, 238, 0.1)',
                      }}>
                        <LightbulbIcon 
                          color={theme.palette.mode === 'dark' ? 'info' : 'primary'} 
                          fontSize="small" 
                        />
                      </Box>
                      <ListItemText
                        primary={
                          <Typography sx={{ fontWeight: 600 }}>
                            {item.content}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {item.timestamp.toLocaleDateString()} • {item.timestamp.toLocaleTimeString()}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          edge="end" 
                          aria-label="delete" 
                          onClick={() => handleDeleteItem(item.id)}
                          sx={{
                            color: theme.palette.error.main,
                            opacity: 0.7,
                            transition: 'all 0.2s',
                            '&:hover': {
                              opacity: 1,
                              transform: 'scale(1.1)',
                              color: theme.palette.error.main,
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider component="li" sx={{ my: 1 }} />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box 
                sx={{ 
                  mt: 4, 
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.02)' 
                    : 'rgba(0,0,0,0.02)',
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  No idea evaluations yet. Start by evaluating your startup idea!
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={handleEvaluateIdea}
                    startIcon={<LightbulbIcon />}
                  >
                    Evaluate Idea
                  </Button>
                </Box>
              </Box>
            )}
          </TabPanel>
          
          <TabPanel value={activeTab} index={2}>
            {filterHistoryByType('chat').length > 0 ? (
              <List sx={{ mt: 1 }}>
                {filterHistoryByType('chat').map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem 
                      alignItems="flex-start"
                      sx={{
                        borderRadius: 2,
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255,255,255,0.05)' 
                            : 'rgba(0,0,0,0.02)',
                          transform: 'translateX(5px)'
                        }
                      }}
                    >
                      <Box sx={{ 
                        mr: 2, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        p: 1,
                        borderRadius: '50%',
                        bgcolor: theme.palette.mode === 'dark' 
                          ? 'rgba(247, 37, 133, 0.1)' 
                          : 'rgba(251, 86, 7, 0.1)',
                      }}>
                        <ChatIcon 
                          color={theme.palette.mode === 'dark' ? 'secondary' : 'secondary'} 
                          fontSize="small" 
                        />
                      </Box>
                      <ListItemText
                        primary={
                          <Typography sx={{ fontWeight: 600 }}>
                            {item.content}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {item.timestamp.toLocaleDateString()} • {item.timestamp.toLocaleTimeString()}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          edge="end" 
                          aria-label="delete" 
                          onClick={() => handleDeleteItem(item.id)}
                          sx={{
                            color: theme.palette.error.main,
                            opacity: 0.7,
                            transition: 'all 0.2s',
                            '&:hover': {
                              opacity: 1,
                              transform: 'scale(1.1)',
                              color: theme.palette.error.main,
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider component="li" sx={{ my: 1 }} />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box 
                sx={{ 
                  mt: 4, 
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 2,
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.02)' 
                    : 'rgba(0,0,0,0.02)',
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  No chat history yet. Start chatting with ConblenAI!
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    color="secondary"
                    size="small"
                    onClick={handleChatWithAI}
                    startIcon={<ChatIcon />}
                  >
                    Chat with AI
                  </Button>
                </Box>
              </Box>
            )}
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard; 