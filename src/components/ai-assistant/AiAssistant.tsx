import React, { useState, useRef, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Divider, 
  List,
  ListItem,
  Avatar,
  IconButton,
  CircularProgress,
  Tooltip,
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { useHistory } from '../../context/HistoryContext';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// Improved AI response generator that uses the user's message
const mockAiResponse = async (userMessage: string): Promise<string> => {
  // In a real app, this would be an API call to an AI service
  return new Promise((resolve) => {
    // Basic keyword-based response system
    const userMessageLower = userMessage.toLowerCase();
    
    let response = "";
    
    if (userMessageLower.includes("market") || userMessageLower.includes("audience")) {
      response = "Market research is crucial for startup success. Start by defining your target audience clearly and understanding their pain points. Online surveys, competitor analysis, and industry reports can provide valuable insights into market trends.";
    } 
    else if (userMessageLower.includes("pricing") || userMessageLower.includes("revenue")) {
      response = "For pricing strategy, consider value-based pricing where you charge based on the perceived value to customers. Start with competitive analysis, then test different price points. Many successful SaaS startups use tiered pricing with a freemium model to drive initial adoption.";
    }
    else if (userMessageLower.includes("funding") || userMessageLower.includes("investor")) {
      response = "When seeking funding, focus first on building a minimum viable product and validating your market. Angel investors typically invest at early stages for 10-25% equity. For VC funding, you'll need strong traction metrics and a clear path to scaling your business.";
    }
    else if (userMessageLower.includes("competitor") || userMessageLower.includes("competition")) {
      response = "A thorough competitive analysis should identify direct and indirect competitors. Map out their strengths, weaknesses, pricing models, and unique selling propositions. Look for gaps in the market that your startup can fill with a differentiated offering.";
    }
    else if (userMessageLower.includes("tech") || userMessageLower.includes("stack") || userMessageLower.includes("technology")) {
      response = "Choose a technology stack that balances development speed with scalability. For most startups, prioritize technologies your team is already familiar with to reduce technical debt. Consider cloud services for infrastructure to minimize upfront costs.";
    }
    else if (userMessageLower.includes("mvp") || userMessageLower.includes("prototype") || userMessageLower.includes("minimum viable product")) {
      response = "Your MVP should focus on solving the core problem for your target users. Strip away all non-essential features and focus on the 20% of functionality that delivers 80% of the value. Set clear success metrics to validate your assumptions.";
    }
    else if (userMessageLower.includes("marketing") || userMessageLower.includes("growth")) {
      response = "For early-stage startups, focus on low-cost, high-impact marketing channels. Content marketing, SEO, and social media can build organic growth. Identify where your target users spend time online and concentrate efforts there instead of spreading too thin.";
    }
    else if (userMessageLower.includes("validate") || userMessageLower.includes("test") || userMessageLower.includes("idea")) {
      response = "Validate your startup idea before significant investment. Start with customer interviews to confirm the problem exists. Create landing pages to test messaging and gauge interest. Use pre-sales or crowdfunding to validate willingness to pay.";
    }
    else {
      // Default responses if no keywords match
      const defaultResponses = [
        "Based on current market trends, I recommend focusing on validating your core value proposition with potential customers before building a full product. What specific problem are you trying to solve?",
        "Many successful startups begin by solving a problem the founders personally experienced. What inspired your startup idea?",
        "Starting lean is crucial. Consider which features are absolutely essential for your MVP and which can be developed later based on user feedback.",
        "For early-stage startups, finding product-market fit should be your primary goal. This means iterating quickly based on user feedback until you have a product that users truly need.",
        "Have you validated your idea with potential customers? Early user interviews can save significant time and resources by confirming your assumptions about the market need."
      ];
      response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    setTimeout(() => {
      resolve(response);
    }, 1500);
  });
};

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      content: "Hi, I'm ConblenAI, your startup assistant. How can I help you today? Try asking about market research, pricing strategies, tech stack choices, or ways to validate your startup idea.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(3);
  const [showLimit, setShowLimit] = useState(false);
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const { addHistoryItem } = useHistory();
  const isPro = false; // In a real app, this would be fetched from user data
  const DAILY_QUESTION_LIMIT = 10;

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    if (!isPro && questionCount >= DAILY_QUESTION_LIMIT) {
      setShowLimit(true);
      setTimeout(() => setShowLimit(false), 5000);
      return;
    }
    
    const userMessageContent = newMessage.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userMessageContent,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setLoading(true);
    
    try {
      // Send message to AI service
      const response = await mockAiResponse(userMessageContent);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      
      // Add to history
      addHistoryItem('chat', userMessageContent);
      
      if (!isPro) {
        setQuestionCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mt: { xs: 2, sm: 3, md: 4 }, mb: { xs: 4, sm: 6, md: 8 } }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
            fontWeight: 600,
            mb: { xs: 2, sm: 3 }
          }}
        >
          Chat with ConblenAI
        </Typography>
        
        {!isPro && (
          <Box sx={{ mb: { xs: 2, sm: 3 } }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
            >
              Free tier: {questionCount}/{DAILY_QUESTION_LIMIT} questions used today
            </Typography>
          </Box>
        )}
        
        {showLimit && (
          <Alert severity="warning" sx={{ mb: { xs: 2, sm: 3 } }}>
            You've reached your daily limit of {DAILY_QUESTION_LIMIT} questions. Upgrade to Pro for unlimited access.
          </Alert>
        )}
        
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 1, sm: 2 }, 
            mb: { xs: 2, sm: 3 }, 
            height: { xs: '50vh', sm: '60vh' }, 
            display: 'flex', 
            flexDirection: 'column',
            borderRadius: { xs: 2, sm: 3 }
          }}
        >
          <Box sx={{ 
            flexGrow: 1, 
            overflow: 'auto', 
            px: { xs: 1, sm: 2 }, 
            scrollbarWidth: 'thin' 
          }}>
            <List>
              {messages.map((message) => (
                <ListItem
                  key={message.id}
                  sx={{
                    flexDirection: 'column',
                    alignItems: message.isUser ? 'flex-end' : 'flex-start',
                    mb: { xs: 1, sm: 1.5 },
                    px: { xs: 0, sm: 1 }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: message.isUser ? 'row-reverse' : 'row',
                      alignItems: 'flex-start',
                      gap: { xs: 0.5, sm: 1 }
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: message.isUser ? 'primary.main' : 'secondary.main',
                        width: { xs: 28, sm: 32 },
                        height: { xs: 28, sm: 32 }
                      }}
                    >
                      {message.isUser ? 
                        <PersonIcon fontSize={isMobile ? "small" : "medium"} /> : 
                        <SmartToyIcon fontSize={isMobile ? "small" : "medium"} />
                      }
                    </Avatar>
                    <Paper
                      elevation={1}
                      sx={{
                        p: { xs: 1.5, sm: 2 },
                        maxWidth: { xs: '85%', sm: '80%' },
                        backgroundColor: message.isUser ? 'primary.light' : 'background.paper',
                        borderRadius: message.isUser ? '20px 20px 0 20px' : '20px 20px 20px 0'
                      }}
                    >
                      <Typography 
                        variant="body1"
                        sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                      >
                        {message.content}
                      </Typography>
                    </Paper>
                  </Box>
                  
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      mt: 0.5,
                      mr: message.isUser ? 0 : 'auto',
                      ml: message.isUser ? 'auto' : 0,
                      fontSize: { xs: '0.7rem', sm: '0.75rem' }
                    }}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </ListItem>
              ))}
              {loading && (
                <ListItem
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    mb: 1
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: 'secondary.main',
                        width: { xs: 28, sm: 32 },
                        height: { xs: 28, sm: 32 }
                      }}
                    >
                      <SmartToyIcon fontSize={isMobile ? "small" : "medium"} />
                    </Avatar>
                    <CircularProgress size={isMobile ? 16 : 20} />
                  </Box>
                </ListItem>
              )}
              <div ref={messageEndRef} />
            </List>
          </Box>
          
          <Divider sx={{ my: { xs: 1, sm: 2 } }} />
          
          <Box 
            component="form" 
            onSubmit={handleSendMessage} 
            sx={{ 
              display: 'flex', 
              p: { xs: 0.5, sm: 1 } 
            }}
          >
            <TextField
              fullWidth
              placeholder="Ask ConblenAI about startup ideas, market strategy, etc..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={loading || (!isPro && questionCount >= DAILY_QUESTION_LIMIT)}
              sx={{ 
                mr: 1,
                '& .MuiInputBase-root': {
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  borderRadius: { xs: '16px', sm: '20px' }
                }
              }}
            />
            <IconButton
              color="primary"
              type="submit"
              disabled={!newMessage.trim() || loading || (!isPro && questionCount >= DAILY_QUESTION_LIMIT)}
              sx={{ 
                width: { xs: 36, sm: 40 }, 
                height: { xs: 36, sm: 40 } 
              }}
            >
              <SendIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Box>
        </Paper>
        
        <Paper 
          elevation={2} 
          sx={{ 
            p: { xs: 1.5, sm: 2 },
            borderRadius: { xs: 2, sm: 3 }
          }}
        >
          <Typography 
            variant="subtitle2" 
            gutterBottom
            sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
          >
            Limitations:
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
          >
            • Free users are limited to {DAILY_QUESTION_LIMIT} questions per day
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
          >
            • ConblenAI cannot provide legal or investment advice
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
          >
            • Information provided is educational and should be verified
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AiAssistant; 