const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const { connect } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/tournaments', require('./routes/tournaments'));
app.use('/api/players', require('./routes/players'));
app.use('/api/matches', require('./routes/matches'));

// basic health
app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;

// connect to DB then start
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`rh-gaming-backend connected to DB and listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to DB', err);
    process.exit(1);
  });

// Export app for tests (if needed)
module.exports = app;
