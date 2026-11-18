/**
 * backend/server.js
 *
 * Ward 16 Digital Heritage — Traditional Node.js + Express Backend
 * Features:
 * - Traditional Express architecture
 * - Native CORS middleware for cross-origin frontend communication
 * - PostgreSQL integration with connection pool
 * - Text-document grounded AI Heritage Chatbot
 * - Community archive moderation and story storage
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/db');
const chatRoutes = require('./routes/chat');
const storyRoutes = require('./routes/stories');
const adminRoutes = require('./routes/admin');
const locationRoutes = require('./routes/locations');
const chatService = require('./services/chatService');

const app = express();
const PORT = process.env.PORT || 5001;

/* ----------------------------------------------------------
   CORS CONFIGURATION (TRADITIONAL METHOD)
   Enables safe cross-origin requests from the Next.js frontend
   ---------------------------------------------------------- */
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3001',
  'http://localhost:3002',
  'http://127.0.0.1:3002',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      // In development or if origin matches any localhost / 127.0.0.1 port
      if (
        process.env.NODE_ENV !== 'production' ||
        allowedOrigins.indexOf(origin) !== -1 ||
        /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error('Blocked by CORS policy'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-forwarded-for'],
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging in development
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/* ----------------------------------------------------------
   API ROUTES
   ---------------------------------------------------------- */

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    knowledgeSections: chatService.getSectionCount(),
    service: 'Ward 16 Heritage Backend (PostgreSQL + CORS)',
  });
});

// Chatbot: Grounded on backend/data/knowledge_base.txt
app.use('/api/heritage-guide', chatRoutes);

// Community archive stories and public submissions
app.use('/api/community-archive', storyRoutes);

// Admin moderation
app.use('/api/admin', adminRoutes);

// Heritage locations and coordinates
app.use('/api/admin', locationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found on Ward 16 Heritage Backend' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]', err);
  res.status(500).json({ error: 'Internal server error occurred.' });
});

/* ----------------------------------------------------------
   SERVER INITIALIZATION
   ---------------------------------------------------------- */
async function startServer() {
  // Test PostgreSQL connection
  await testConnection();

  app.listen(PORT, () => {
    console.log(`================================================================`);
    console.log(`Ward 16 Heritage Backend Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log(`Chatbot endpoint: http://localhost:${PORT}/api/heritage-guide`);
    console.log(`CORS enabled for: ${allowedOrigins.join(', ')}`);
    console.log(`================================================================`);
  });
}

startServer();

module.exports = app;
