const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getCrops, getCropById, getUserActivities } = require('./data/crops');
const { validateUserSelection, validateDateRange } = require('./utils/validation');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for user selections (in production, use a database)
let userSelections = {};

// API Routes

// Get all available crops
app.get('/api/crops', (req, res) => {
  try {
    const crops = getCrops();
    res.json(crops);
  } catch (error) {
    res.status(500).json({ error: 'Serveri viga: ' + error.message });
  }
});

// Get crop by ID
app.get('/api/crops/:id', (req, res) => {
  try {
    const crop = getCropById(req.params.id);
    if (!crop) {
      return res.status(404).json({ error: 'Kultuuri ei leitud' });
    }
    res.json(crop);
  } catch (error) {
    res.status(500).json({ error: 'Serveri viga: ' + error.message });
  }
});

// Get user's selected crops and activities
app.get('/api/user/activities', (req, res) => {
  try {
    const { location, days = 14 } = req.query;
    
    if (!location) {
      return res.status(400).json({ error: 'Kasvukoht on kohustuslik' });
    }

    const validationError = validateDateRange(days);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const userId = 'default'; // In production, use actual user authentication
    const userCrops = userSelections[userId] || [];
    
    const activities = getUserActivities(userCrops, location, parseInt(days));
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Serveri viga: ' + error.message });
  }
});

// Add crop to user's selection
app.post('/api/user/crops', (req, res) => {
  try {
    const { cropId, location } = req.body;
    
    const validationError = validateUserSelection(cropId, location);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const crop = getCropById(cropId);
    if (!crop) {
      return res.status(404).json({ error: 'Kultuuri ei leitud' });
    }

    const userId = 'default';
    if (!userSelections[userId]) {
      userSelections[userId] = [];
    }

    // Check if crop already added
    const existing = userSelections[userId].find(
      uc => uc.cropId === cropId && uc.location === location
    );
    
    if (existing) {
      return res.status(400).json({ error: 'Kultuur on juba lisatud' });
    }

    userSelections[userId].push({ cropId, location, addedAt: new Date().toISOString() });
    res.json({ message: 'Kultuur edukalt lisatud', crops: userSelections[userId] });
  } catch (error) {
    res.status(500).json({ error: 'Serveri viga: ' + error.message });
  }
});

// Remove crop from user's selection
app.delete('/api/user/crops/:cropId', (req, res) => {
  try {
    const { cropId } = req.params;
    const { location } = req.query;
    
    if (!location) {
      return res.status(400).json({ error: 'Kasvukoht on kohustuslik' });
    }

    const userId = 'default';
    if (!userSelections[userId]) {
      return res.status(404).json({ error: 'Kasutaja valikuid ei leitud' });
    }

    const initialLength = userSelections[userId].length;
    userSelections[userId] = userSelections[userId].filter(
      uc => !(uc.cropId === cropId && uc.location === location)
    );

    if (userSelections[userId].length === initialLength) {
      return res.status(404).json({ error: 'Kultuuri ei leitud valikutest' });
    }

    res.json({ message: 'Kultuur edukalt eemaldatud', crops: userSelections[userId] });
  } catch (error) {
    res.status(500).json({ error: 'Serveri viga: ' + error.message });
  }
});

// Get user's selected crops
app.get('/api/user/crops', (req, res) => {
  try {
    const userId = 'default';
    const userCrops = userSelections[userId] || [];
    
    const cropsWithDetails = userCrops.map(uc => {
      const crop = getCropById(uc.cropId);
      return {
        ...uc,
        crop: crop
      };
    });
    
    res.json(cropsWithDetails);
  } catch (error) {
    res.status(500).json({ error: 'Serveri viga: ' + error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server töötab' });
});

app.listen(PORT, () => {
  console.log(`Server töötab pordil ${PORT}`);
});
