import express from 'express';
import { prophetsData, chartsData } from './data.js';

const router = express.Router();

// Get all prophets
router.get('/api/prophets', (req, res) => {
  res.json({
    success: true,
    data: prophetsData,
    count: prophetsData.length
  });
});

// Get specific prophet by name
router.get('/api/prophets/:name', (req, res) => {
  const prophetName = req.params.name.toLowerCase();
  const prophet = prophetsData.find(p => p.name.toLowerCase() === prophetName);

  if (!prophet) {
    return res.status(404).json({
      success: false,
      error: 'Prophet not found'
    });
  }

  res.json({
    success: true,
    data: prophet
  });
});

// Get charts data
router.get('/api/charts', (req, res) => {
  res.json({
    success: true,
    data: chartsData
  });
});

// Search prophets
router.get('/api/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';

  if (!query) {
    return res.status(400).json({
      success: false,
      error: 'Search query is required'
    });
  }

  const results = prophetsData.filter(prophet =>
    prophet.name.toLowerCase().includes(query) ||
    prophet.theme.toLowerCase().includes(query) ||
    prophet.mainSin.toLowerCase().includes(query) ||
    prophet.judgment.toLowerCase().includes(query) ||
    prophet.mercy.toLowerCase().includes(query) ||
    prophet.character.toLowerCase().includes(query) ||
    prophet.responsibility.toLowerCase().includes(query) ||
    prophet.location.toLowerCase().includes(query)
  );

  res.json({
    success: true,
    data: results,
    count: results.length,
    query: query
  });
});

export default router;
