import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  CircularProgress,
  useTheme,
  IconButton,
  Tooltip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from '../../context/HistoryContext';

type ResponseCategory = 'business' | 'funding' | 'marketing' | 'default';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const getAIResponse = (userMessage: string): string => {
  const responses: Record<ResponseCategory, string[]> = {
    business: [
      "Based on your business idea, I recommend focusing on market validation first. Have you considered conducting customer interviews?",
      "That's an interesting business model. To improve it, you might want to consider these key aspects: 1) Customer acquisition cost, 2) Lifetime value, and 3) Market size.",
      "For your startup's growth strategy, I suggest starting with a small but dedicated target market. This allows for better product-market fit.",
    ],
    funding: [
      "For early-stage funding, consider these options: 1) Bootstrapping, 2) Angel investors, 3) Crowdfunding, or 4) Accelerator programs.",
      "To attract investors, you'll need: 1) A solid business plan, 2) Clear market opportunity, 3) Strong team, and 4) Prototype or MVP.",
      "Before seeking funding, ensure you have: 1) Financial projections, 2) Clear use of funds, 3) Growth metrics, and 4) Competition analysis.",
    ],
    marketing: [
      "For B2B marketing, focus on: 1) LinkedIn presence, 2) Content marketing, 3) Email campaigns, and 4) Industry partnerships.",
      "To improve your marketing strategy, consider: 1) Customer segmentation, 2) Value proposition, 3) Channel optimization, and 4) ROI tracking.",
      "Digital marketing best practices include: 1) SEO optimization, 2) Social media engagement, 3) Email nurturing, and 4) Analytics tracking.",
    ],
    default: [
      "I'm here to help! Let's discuss your startup idea in more detail. What specific aspects would you like to explore?",
      "That's interesting! To provide better guidance, could you tell me more about your target market and business model?",
      "I can help you with various aspects of your startup, including business strategy, funding, marketing, and product development. What would you like to focus on?",
    ],
  };

  const message = userMessage.toLowerCase();
  let category: ResponseCategory = 'default';

  if (message.includes('fund') || message.includes('invest') || message.includes('money')) {
    category = 'funding';
  } else if (message.includes('market') || message.includes('advertis') || message.includes('promote')) {
    category = 'marketing';
  } else if (message.includes('business') || message.includes('startup') || message.includes('company')) {
    category = 'business';
  }

  const categoryResponses = responses[category];
  return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
};

const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const { addHistoryItem } = useHistory();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      await addHistoryItem('chat', userMessage.content);

      // Get AI response based on user input
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: getAIResponse(userMessage.content),
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);

        addHistoryItem('chat', aiResponse.content);
      }, 1500);
    } catch (error) {
      console.error('Error in chat:', error);
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          height: 'calc(100vh - 140px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          background: theme.palette.background.paper,
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
        <Box sx={{ 
          p: 3, 
          borderBottom: 1, 
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Chat with AI Assistant
            </Typography>
            <Typography color="text.secondary">
              Get expert guidance on your startup journey
            </Typography>
          </Box>
          <Tooltip title="Clear chat">
            <IconButton onClick={clearChat} color="primary">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          sx={{
            p: 3,
            flexGrow: 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            bgcolor: theme.palette.background.default,
          }}
        >
          {messages.length === 0 && (
            <Box sx={{ 
              textAlign: 'center', 
              color: 'text.secondary',
              mt: 4 
            }}>
              <SmartToyIcon sx={{ fontSize: 48, mb: 2, color: theme.palette.primary.main }} />
              <Typography variant="h6" gutterBottom>
                Welcome to ConblenAI Assistant
              </Typography>
              <Typography>
                Ask me anything about your startup idea, business strategy, or funding options.
              </Typography>
            </Box>
          )}
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                gap: 2,
              }}
            >
              {message.sender === 'ai' && (
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    boxShadow: theme.shadows[2],
                  }}
                >
                  <SmartToyIcon />
                </Avatar>
              )}
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  maxWidth: '70%',
                  borderRadius: 2,
                  bgcolor: message.sender === 'user' ? theme.palette.primary.main : theme.palette.background.paper,
                  color: message.sender === 'user' ? 'white' : 'inherit',
                  boxShadow: theme.shadows[2],
                }}
              >
                <Typography>{message.content}</Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block',
                    mt: 1,
                    color: message.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                  }}
                >
                  {message.timestamp.toLocaleTimeString()}
                </Typography>
              </Paper>
              {message.sender === 'user' && (
                <Avatar
                  sx={{
                    bgcolor: theme.palette.secondary.main,
                    boxShadow: theme.shadows[2],
                  }}
                >
                  <PersonIcon />
                </Avatar>
              )}
            </Box>
          ))}
          {isLoading && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  boxShadow: theme.shadows[2],
                }}
              >
                <SmartToyIcon />
              </Avatar>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: theme.shadows[2],
                }}
              >
                <CircularProgress size={20} />
              </Paper>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!input.trim() || isLoading}
              sx={{
                px: 3,
                borderRadius: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                },
              }}
            >
              <SendIcon />
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat; 