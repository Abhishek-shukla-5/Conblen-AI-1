import React from 'react';
import { 
  Box, 
  Typography, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Paper,
  Grid,
  Chip,
  Button
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessIcon from '@mui/icons-material/Business';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface EvaluationResult {
  marketDemand: number;
  uniquenessScore: number;
  technicalFeasibility: number;
  competitors: string[];
  improvementSuggestions: string[];
  overallScore: number;
}

interface IdeaResultsProps {
  result: EvaluationResult;
  ideaName: string;
  onRestart: () => void;
}

const getDifficultyLevel = (score: number) => {
  if (score >= 75) return 'Easy';
  if (score >= 50) return 'Medium';
  return 'Hard';
};

const getDifficultyColor = (level: string) => {
  switch (level) {
    case 'Easy':
      return '#4caf50';
    case 'Medium':
      return '#ff9800';
    case 'Hard':
      return '#f44336';
    default:
      return '#757575';
  }
};

const IdeaResults: React.FC<IdeaResultsProps> = ({ result, ideaName, onRestart }) => {
  if (!result) return null;

  const chartData = {
    labels: ['Market Demand', 'Uniqueness', 'Technical Feasibility'],
    datasets: [
      {
        label: 'Score (out of 100)',
        data: [
          result.marketDemand,
          result.uniquenessScore,
          result.technicalFeasibility
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  const getScoreRating = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    if (score >= 20) return 'Below Average';
    return 'Poor';
  };

  const getMarketAnalysis = (score: number) => {
    if (score >= 80) return 'Strong market demand with significant growth potential. The timing appears to be right for this solution.';
    if (score >= 60) return 'Good market demand with reasonable growth prospects. The market shows interest in solutions like this.';
    if (score >= 40) return 'Moderate market demand. Consider validating with more potential customers before proceeding.';
    if (score >= 20) return 'Limited market demand detected. Consider pivoting or narrowing your target audience.';
    return 'Very low market demand. This idea may not solve a significant problem for enough people.';
  };

  const getTechnicalAnalysis = (score: number) => {
    if (score >= 80) return 'Highly feasible with current technology. Implementation should be straightforward with minimal technical challenges.';
    if (score >= 60) return 'Technically feasible with some challenges. May require specialized knowledge but generally achievable.';
    if (score >= 40) return 'Moderate technical challenges. Consider building a simplified MVP first to validate core functionality.';
    if (score >= 20) return 'Significant technical barriers exist. May require substantial R&D or specialized expertise.';
    return 'Major technical challenges that may be difficult to overcome with current technology. Consider simplifying your approach.';
  };

  const difficultyLevel = getDifficultyLevel(result.technicalFeasibility);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Evaluation Results for "{ideaName}"
        </Typography>
        <Button 
          variant="outlined" 
          onClick={onRestart} 
          sx={{ mt: 2 }}
          startIcon={<RestartAltIcon />}
        >
          Evaluate Another Idea
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Paper elevation={2} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                {result.overallScore}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overall Score
              </Typography>
            </Paper>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Paper elevation={2} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: getDifficultyColor(difficultyLevel) }}>
                {difficultyLevel}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Difficulty Level
              </Typography>
            </Paper>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Paper elevation={2} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                {result.competitors.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Competitors Found
              </Typography>
            </Paper>
          </Box>
        </Box>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            <BarChartIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Score Breakdown
          </Typography>
          <Box sx={{ height: 300 }}>
            <Bar data={chartData} options={chartOptions} />
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Market Analysis
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip 
                  label={`Market Demand: ${getScoreRating(result.marketDemand)}`} 
                  color="primary" 
                  variant="outlined" 
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" paragraph>
                  {getMarketAnalysis(result.marketDemand)}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Competition:
                </Typography>
                <List dense>
                  {result.competitors.map((competitor, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <BusinessIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={competitor} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                <LightbulbIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Improvement Suggestions
              </Typography>
              <List dense>
                {result.improvementSuggestions.map((suggestion, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <StarIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={suggestion} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        </Box>

        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Technical Assessment
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Chip 
              label={`Feasibility: ${getScoreRating(result.technicalFeasibility)}`} 
              color="primary" 
              variant="outlined" 
              sx={{ mb: 1 }}
            />
            <Typography variant="body2">
              {getTechnicalAnalysis(result.technicalFeasibility)}
            </Typography>
          </Box>
        </Paper>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={onRestart}
          startIcon={<RestartAltIcon />}
          sx={{ py: 1.5, px: 4 }}
        >
          Evaluate Another Startup Idea
        </Button>
      </Box>
    </Box>
  );
};

export default IdeaResults; 