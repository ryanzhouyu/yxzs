const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/videos');
const hotspotRoutes = require('./routes/hotspots');
const appRoutes = require('./routes/apps');
const creationRoutes = require('./routes/creations');
const marketingRoutes = require('./routes/marketing');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const globalLimitMax = parseInt(process.env.RATE_LIMIT_MAX || (isProduction ? '100' : '1000'), 10);
const authLimitMax = parseInt(process.env.AUTH_RATE_LIMIT_MAX || (isProduction ? '5' : '100'), 10);

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: globalLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: '请求过于频繁，请稍后再试' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: authLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: !isProduction,
  message: { error: '登录尝试过于频繁，请稍后再试' },
});

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(globalLimiter);

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/hotspots', hotspotRoutes);
app.use('/api/apps', appRoutes);
app.use('/api/creations', creationRoutes);
app.use('/api/marketing', marketingRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

module.exports = app;
