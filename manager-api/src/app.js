const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/videos');
const hotspotRoutes = require('./routes/hotspots');
const appRoutes = require('./routes/apps');
const creationRoutes = require('./routes/creations');
const marketingRoutes = require('./routes/marketing');

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/hotspots', hotspotRoutes);
app.use('/api/apps', appRoutes);
app.use('/api/creations', creationRoutes);
app.use('/api/marketing', marketingRoutes);

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
