import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  Rating,
  keyframes,
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useHistory } from '../../context/HistoryContext';
import AIAssistant from '../chat/AIAssistant';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

interface EvaluationResult {
  scores: {
    problemClarity: number;
    solutionUniqueness: number;
    marketPotential: number;
    targetAudienceFit: number;
    monetizationStrategy: number;
    scalability: number;
    technicalFeasibility: number;
  };
  feedback: {
    problemClarity: string;
    solutionUniqueness: string;
    marketPotential: string;
    targetAudienceFit: string;
    monetizationStrategy: string;
    scalability: string;
    technicalFeasibility: string;
  };
  verdict: string;
  suggestions: string[];
}

interface FormData {
  startupName: string;
  industry: string;
  problem: string;
  solution: string;
  targetAudience: string;
  revenueModel: string;
  usp: string;
}

const steps = ['Describe Your Startup', 'AI Analysis', 'Results'];

const Evaluate: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    startupName: '',
    industry: '',
    problem: '',
    solution: '',
    targetAudience: '',
    revenueModel: '',
    usp: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const theme = useTheme();
  const { addHistoryItem } = useHistory();

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.startupName.trim()) return;

    setIsLoading(true);
    setActiveStep(1);

    try {
      // Add evaluation to history
      await addHistoryItem('idea', `Evaluating: ${formData.startupName}`);

      // Construct the prompt
      const prompt = `
        Evaluate this startup idea:
        Name: ${formData.startupName}
        Industry: ${formData.industry}
        Problem: ${formData.problem}
        Solution: ${formData.solution}
        Target Audience: ${formData.targetAudience}
        Revenue Model: ${formData.revenueModel}
        USP: ${formData.usp}

        Please provide a detailed evaluation in JSON format with:
        1. Scores (1-10) and feedback for:
           - Problem Clarity
           - Solution Uniqueness
           - Market Potential
           - Target Audience Fit
           - Monetization Strategy
           - Scalability
           - Technical Feasibility
        2. A one-line verdict
        3. 2-3 specific suggestions for improvement
      `;

      // TODO: Replace with actual API call to your AI model
      const mockResult: EvaluationResult = {
        scores: {
          problemClarity: 8.5,
          solutionUniqueness: 7.5,
          marketPotential: 9.0,
          targetAudienceFit: 8.0,
          monetizationStrategy: 7.0,
          scalability: 8.5,
          technicalFeasibility: 7.5,
        },
        feedback: {
          problemClarity: "The problem is well-defined and addresses a clear market need.",
          solutionUniqueness: "The solution is innovative but faces some competition.",
          marketPotential: "Strong market opportunity with significant growth potential.",
          targetAudienceFit: "Well-defined target audience with clear value proposition.",
          monetizationStrategy: "Revenue model needs more detail and validation.",
          scalability: "Good potential for scaling with proper infrastructure.",
          technicalFeasibility: "Technically achievable with some development challenges.",
        },
        verdict: "This startup shows strong potential with a clear market opportunity and innovative solution, though the revenue model needs refinement.",
        suggestions: [
          "Develop a more detailed revenue model with specific pricing strategies",
          "Conduct market research to validate target audience assumptions",
          "Create a technical roadmap to address feasibility challenges"
        ]
      };

      // Simulate API delay
      setTimeout(() => {
        setResult(mockResult);
        setIsLoading(false);
        setActiveStep(2);
        addHistoryItem('idea', `Evaluation Result: ${mockResult.verdict}`);
      }, 2000);
    } catch (error) {
      console.error('Error in evaluation:', error);
      setIsLoading(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{
              '& .MuiTextField-root': {
                mb: 3,
                '& .MuiInputLabel-root': {
                  fontWeight: 600,
                  fontSize: '1.1rem',
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              },
            }}
          >
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
              mb: 4,
            }}>
              <Box>
                <TextField
                  fullWidth
                  label="Startup Name"
                  value={formData.startupName}
                  onChange={handleInputChange('startupName')}
                  required
                  variant="outlined"
                  sx={{ 
                    '& .MuiInputBase-input': {
                      fontSize: '1.1rem',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Industry/Niche"
                  value={formData.industry}
                  onChange={handleInputChange('industry')}
                  required
                  variant="outlined"
                  sx={{ 
                    '& .MuiInputBase-input': {
                      fontSize: '1.1rem',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Target Audience"
                  value={formData.targetAudience}
                  onChange={handleInputChange('targetAudience')}
                  required
                  variant="outlined"
                  sx={{ 
                    '& .MuiInputBase-input': {
                      fontSize: '1.1rem',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Revenue Model"
                  value={formData.revenueModel}
                  onChange={handleInputChange('revenueModel')}
                  required
                  variant="outlined"
                  sx={{ 
                    '& .MuiInputBase-input': {
                      fontSize: '1.1rem',
                    },
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Problem"
                  value={formData.problem}
                  onChange={handleInputChange('problem')}
                  required
                  variant="outlined"
                  sx={{ 
                    '& .MuiInputBase-input': {
                      fontSize: '1.1rem',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Solution"
                  value={formData.solution}
                  onChange={handleInputChange('solution')}
                  required
                  variant="outlined"
                  sx={{ 
                    '& .MuiInputBase-input': {
                      fontSize: '1.1rem',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Unique Selling Proposition (USP)"
                  value={formData.usp}
                  onChange={handleInputChange('usp')}
                  required
                  variant="outlined"
                  sx={{ 
                    '& .MuiInputBase-input': {
                      fontSize: '1.1rem',
                    },
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                startIcon={<RocketLaunchIcon />}
                sx={{
                  mt: 2,
                  py: 2,
                  px: 6,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Evaluate Startup
              </Button>
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 8,
              animation: `${pulse} 2s infinite ease-in-out`,
            }}
          >
            <CircularProgress 
              size={80} 
              sx={{ 
                color: theme.palette.primary.main,
                mb: 4,
              }} 
            />
            <Typography 
              variant="h5" 
              sx={{ 
                mt: 2,
                fontWeight: 600,
                color: theme.palette.text.primary,
              }}
            >
              Analyzing your startup idea...
            </Typography>
          </Box>
        );

      case 2:
        return result && (
          <Box sx={{ animation: `${fadeIn} 0.5s ease-out` }}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 4, 
                mb: 6, 
                textAlign: 'center',
                borderRadius: 3,
                background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Evaluation Verdict
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                }}
              >
                {result.verdict}
              </Typography>
            </Paper>

            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
              gap: 4,
            }}>
              {Object.entries(result.scores).map(([category, score]) => (
                <Paper 
                  key={category} 
                  elevation={1} 
                  sx={{ 
                    p: 3,
                    borderRadius: 3,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                    }}
                  >
                    {category.split(/(?=[A-Z])/).join(' ')}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating 
                      value={score / 2} 
                      readOnly 
                      precision={0.5}
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                    <Typography 
                      sx={{ 
                        ml: 2,
                        fontWeight: 600,
                        fontSize: '1.1rem',
                      }}
                    >
                      {score.toFixed(1)}/10
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                    }}
                  >
                    {result.feedback[category as keyof typeof result.feedback]}
                  </Typography>
                </Paper>
              ))}
            </Box>

            <Box sx={{ 
              mt: 6, 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 3,
            }}>
              <Button
                variant="outlined"
                onClick={() => setActiveStep(0)}
                sx={{ 
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  },
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setActiveStep(0);
                  setFormData({
                    startupName: '',
                    industry: '',
                    problem: '',
                    solution: '',
                    targetAudience: '',
                    revenueModel: '',
                    usp: '',
                  });
                  setResult(null);
                }}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Evaluate Another Idea
              </Button>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 6,
        animation: `${fadeIn} 0.5s ease-out`,
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4,
          borderRadius: 4,
          background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}
      >
        <Typography 
          variant="h3" 
          gutterBottom 
          align="center" 
          sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 700,
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Evaluate Your Startup Idea
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          align="center" 
          sx={{ 
            mb: 6,
            fontWeight: 400,
            letterSpacing: '0.5px',
          }}
        >
          Get an AI-powered evaluation of your startup idea with detailed feedback
        </Typography>

        <Stepper 
          activeStep={activeStep} 
          sx={{ 
            mb: 6,
            '& .MuiStepLabel-root .Mui-completed': {
              color: theme.palette.primary.main,
            },
            '& .MuiStepLabel-root .Mui-active': {
              color: theme.palette.primary.main,
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel 
                sx={{
                  '& .MuiStepLabel-label': {
                    fontWeight: 600,
                    fontSize: '1.1rem',
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ animation: `${fadeIn} 0.5s ease-out` }}>
          {renderStepContent(activeStep)}
        </Box>
      </Paper>

      <Box sx={{ mt: 6 }}>
        <AIAssistant />
      </Box>
    </Container>
  );
};

export default Evaluate; 