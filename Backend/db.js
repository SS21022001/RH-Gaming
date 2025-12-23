const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rh_gaming';

async function connect() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Schemas
const PlayerSchema = new Schema({
  name: { type: String, required: true },
  tag: { type: String },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const TournamentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

const MatchSchema = new Schema({
  tournament: { type: Schema.Types.ObjectId, ref: 'Tournament', required: true },
  playerA: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  playerB: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  scoreA: { type: Number, default: 0 },
  scoreB: { type: Number, default: 0 },
  status: { type: String, default: 'scheduled' },
  scheduledAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

const ResultSchema = new Schema({
  match: { type: Schema.Types.ObjectId, ref: 'Match', required: true },
  winner: { type: Schema.Types.ObjectId, ref: 'Player' },
  details: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Models
const Player = mongoose.models.Player || mongoose.model('Player', PlayerSchema);
const Tournament = mongoose.models.Tournament || mongoose.model('Tournament', TournamentSchema);
const Match = mongoose.models.Match || mongoose.model('Match', MatchSchema);
const Result = mongoose.models.Result || mongoose.model('Result', ResultSchema);

module.exports = { connect, models: { Player, Tournament, Match, Result }, mongoose };
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'data.db');
const db = new Database(dbPath);

// Initialize schema
db.exec(`
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  tag TEXT,
  rating INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tournaments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  start_date TEXT,
  end_date TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS matches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tournament_id INTEGER NOT NULL,
  player_a_id INTEGER NOT NULL,
  player_b_id INTEGER NOT NULL,
  score_a INTEGER DEFAULT 0,
  score_b INTEGER DEFAULT 0,
  status TEXT DEFAULT 'scheduled',
  scheduled_at TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE,
  FOREIGN KEY (player_a_id) REFERENCES players(id) ON DELETE CASCADE,
  FOREIGN KEY (player_b_id) REFERENCES players(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  match_id INTEGER NOT NULL,
  winner_player_id INTEGER,
  details TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
  FOREIGN KEY (winner_player_id) REFERENCES players(id) ON DELETE SET NULL
);

`);

module.exports = db;
