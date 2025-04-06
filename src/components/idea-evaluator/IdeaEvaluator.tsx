import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Stepper, 
  Step, 
  StepLabel, 
  Paper,
  CircularProgress,
  Grid
} from '@mui/material';
import IdeaResults from './IdeaResults';
import { useHistory } from '../../context/HistoryContext';

interface EvaluationResult {
  marketDemand: number;
  uniquenessScore: number;
  technicalFeasibility: number;
  competitors: string[];
  improvementSuggestions: string[];
  overallScore: number;
}

const mockEvaluateIdea = async (idea: string, description: string, targetMarket: string): Promise<EvaluationResult> => {
  // In a real app, this would call a backend API that uses AI to evaluate the idea
  return new Promise((resolve) => {
    setTimeout(() => {
      // Parse the idea to generate more contextual mock responses
      const ideaLower = idea.toLowerCase();
      const descriptionLower = description.toLowerCase();
      
      let marketDemand = 60 + Math.floor(Math.random() * 30);
      let uniquenessScore = 50 + Math.floor(Math.random() * 40);
      let technicalFeasibility = 55 + Math.floor(Math.random() * 35);
      let competitors = ["Competitor A", "Competitor B"];
      let improvementSuggestions = [];
      
      // Adjust scores based on keywords in the idea or description
      if (ideaLower.includes("ai") || descriptionLower.includes("artificial intelligence")) {
        marketDemand += 15;
        uniquenessScore -= 10; // Many AI startups these days
        technicalFeasibility -= 15; // AI can be technically challenging
        competitors = ["OpenAI", "Anthropic", "Google AI", "Meta AI"];
        improvementSuggestions.push("Consider narrowing down to a specific AI application in an underserved industry");
        improvementSuggestions.push("Focus on data privacy as a differentiator");
      }
      
      if (ideaLower.includes("blockchain") || descriptionLower.includes("crypto")) {
        marketDemand -= 10; // Current market challenges
        uniquenessScore -= 5;
        competitors = ["Coinbase", "Binance", "Ethereum", "Solana"];
        improvementSuggestions.push("Focus on practical utility rather than speculative value");
        improvementSuggestions.push("Consider regulatory compliance from day one");
      }
      
      if (ideaLower.includes("health") || descriptionLower.includes("healthcare")) {
        marketDemand += 10;
        technicalFeasibility -= 20; // Regulatory challenges
        competitors = ["Oscar Health", "Teladoc", "Ro", "Zocdoc"];
        improvementSuggestions.push("Develop a clear regulatory compliance strategy");
        improvementSuggestions.push("Partner with established healthcare providers for credibility");
      }
      
      if (ideaLower.includes("marketplace") || descriptionLower.includes("platform")) {
        marketDemand += 5;
        uniquenessScore -= 15; // Many marketplace platforms exist
        technicalFeasibility += 10; // Well-understood tech
        competitors = ["Amazon", "eBay", "Etsy", "Airbnb"];
        improvementSuggestions.push("Focus on a highly specific niche to avoid competing with giants");
        improvementSuggestions.push("Solve the chicken-and-egg problem with a strong initial value proposition");
      }
      
      if (ideaLower.includes("subscription") || descriptionLower.includes("saas")) {
        marketDemand += 5;
        uniquenessScore -= 5;
        technicalFeasibility += 15;
        competitors = ["Salesforce", "HubSpot", "Zoom", "Slack"];
        improvementSuggestions.push("Develop a freemium model to drive user acquisition");
        improvementSuggestions.push("Focus on integrations with popular tools in your target market");
      }
      
      // Default suggestions if none were added based on keywords
      if (improvementSuggestions.length === 0) {
        improvementSuggestions = [
          "Consider validating your idea with potential customers before building",
          "Start with a minimum viable product to test core assumptions",
          "Explore partnerships that could help you go to market faster",
          "Develop a clear unique selling proposition to differentiate from alternatives"
        ];
      }
      
      // Calculate overall score as weighted average
      const overallScore = Math.round(
        (marketDemand * 0.4) + 
        (uniquenessScore * 0.3) + 
        (technicalFeasibility * 0.3)
      );
      
      // Ensure values are within bounds
      const result = {
        marketDemand: Math.min(100, Math.max(0, marketDemand)),
        uniquenessScore: Math.min(100, Math.max(0, uniquenessScore)),
        technicalFeasibility: Math.min(100, Math.max(0, technicalFeasibility)),
        competitors,
        improvementSuggestions,
        overallScore: Math.min(100, Math.max(0, overallScore))
      };
      
      resolve(result);
    }, 2000);
  });
};

const steps = ['Describe Your Idea', 'Target Market', 'Review & Evaluate'];

const IdeaEvaluator: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [idea, setIdea] = useState('');
  const [description, setDescription] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { addHistoryItem } = useHistory();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleEvaluate = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await mockEvaluateIdea(idea, description, targetMarket);
      setEvaluationResult(result);
      
      // Add to history
      addHistoryItem('idea', idea);
      
      handleNext();
    } catch (err) {
      console.error('Evaluation error:', err);
      setError('An error occurred during evaluation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setActiveStep(0);
    setEvaluationResult(null);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              What's your startup idea?
            </Typography>
            <TextField
              label="Idea Name"
              fullWidth
              margin="normal"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., A meal planning app for busy professionals"
            />
            <TextField
              label="Brief Description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your idea in a few sentences. What problem does it solve? How does it work?"
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Who is your target market?
            </Typography>
            <TextField
              label="Target Audience"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value)}
              placeholder="Describe your ideal customers. Consider demographics, behaviors, and pain points."
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Idea
            </Typography>
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Idea Name:
              </Typography>
              <Typography paragraph>{idea}</Typography>
              
              <Typography variant="subtitle1" gutterBottom>
                Description:
              </Typography>
              <Typography paragraph>{description}</Typography>
              
              <Typography variant="subtitle1" gutterBottom>
                Target Market:
              </Typography>
              <Typography paragraph>{targetMarket}</Typography>
            </Paper>
            
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>
                  Analyzing your idea...
                </Typography>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEvaluate}
                disabled={!idea.trim() || !description.trim() || !targetMarket.trim()}
                sx={{ mt: 2 }}
              >
                Evaluate Now
              </Button>
            )}
          </Box>
        );
      case 3:
        return evaluationResult ? (
          <IdeaResults result={evaluationResult} ideaName={idea} onRestart={handleRestart} />
        ) : (
          <Typography>No evaluation results available.</Typography>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Startup Idea Evaluator
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
          <Step>
            <StepLabel>Results</StepLabel>
          </Step>
        </Stepper>
        
        <Paper elevation={3} sx={{ p: 3 }}>
          {getStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0 || activeStep === 3}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={
                activeStep === 2 || 
                activeStep === 3 || 
                (activeStep === 0 && (!idea.trim() || !description.trim())) ||
                (activeStep === 1 && !targetMarket.trim())
              }
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default IdeaEvaluator; 