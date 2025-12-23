const express = require('express');
const router = express.Router();
const { models } = require('../db');

const Match = models.Match;
const Player = models.Player;

// list matches (optionally filter by tournament_id)
router.get('/', async (req, res) => {
  const { tournament_id } = req.query;
  let rows;
  if (tournament_id) {
    rows = await Match.find({ tournament: tournament_id }).sort({ _id: 1 }).lean();
  } else {
    rows = await Match.find().sort({ _id: -1 }).lean();
  }
  res.json(rows);
});

// get one
router.get('/:id', async (req, res) => {
  const row = await Match.findById(req.params.id).lean();
  if (!row) return res.status(404).json({ error: 'Match not found' });
  res.json(row);
});

// create match
router.post('/', async (req, res) => {
  const { tournament_id, player_a_id, player_b_id, scheduled_at } = req.body;
  if (!tournament_id || !player_a_id || !player_b_id) return res.status(400).json({ error: 'tournament_id, player_a_id and player_b_id are required' });
  const created = await Match.create({ tournament: tournament_id, playerA: player_a_id, playerB: player_b_id, scheduledAt: scheduled_at || null });
  res.status(201).json(created);
});

// update match (scores/status)
router.put('/:id', async (req, res) => {
  const { score_a, score_b, status, scheduled_at } = req.body;
  const updated = await Match.findByIdAndUpdate(req.params.id, { scoreA: score_a, scoreB: score_b, status, scheduledAt: scheduled_at }, { new: true }).lean();
  if (!updated) return res.status(404).json({ error: 'Match not found' });
  res.json(updated);
});

// delete
router.delete('/:id', async (req, res) => {
  const deleted = await Match.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Match not found' });
  res.status(204).end();
});

// simple leaderboard: aggregate wins by player (based on matches with scores)
router.get('/leaderboard/simple', async (req, res) => {
  // We'll compute wins and games per player using aggregation
  const agg = await Match.aggregate([
    {
      $project: {
        players: ["$playerA", "$playerB"],
        winner: {
          $cond: [{ $gt: ["$scoreA", "$scoreB"] }, "$playerA", { $cond: [{ $gt: ["$scoreB", "$scoreA"] }, "$playerB", null] }]
        }
      }
    },
    { $unwind: "$players" },
    {
      $group: {
        _id: "$players",
        games: { $sum: 1 },
        wins: { $sum: { $cond: [{ $eq: ["$players", "$winner"] }, 1, 0] } }
      }
    },
    { $lookup: { from: 'players', localField: '_id', foreignField: '_id', as: 'player' } },
    { $unwind: { path: '$player', preserveNullAndEmptyArrays: true } },
    { $project: { player_id: '$_id', name: '$player.name', tag: '$player.tag', wins: 1, games: 1 } },
    { $sort: { wins: -1, games: -1 } }
  ]);

  res.json(agg);
});

module.exports = router;
