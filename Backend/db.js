require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

const uri = process.env.MONGODB_URI;

async function connect() {
  if (!uri) throw new Error('MONGODB_URI not provided. Set it in .env with your Atlas connection string.');
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
