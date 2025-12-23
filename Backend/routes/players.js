const express = require('express');
const router = express.Router();
const { models } = require('../db');

const Player = models.Player;

// list players
router.get('/', async (req, res) => {
  const rows = await Player.find().sort({ rating: -1, _id: -1 }).lean();
  res.json(rows);
});

// get player
router.get('/:id', async (req, res) => {
  const row = await Player.findById(req.params.id).lean();
  if (!row) return res.status(404).json({ error: 'Player not found' });
  res.json(row);
});

// create player
router.post('/', async (req, res) => {
  const { name, tag } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const created = await Player.create({ name, tag });
  res.status(201).json(created);
});

// update
router.put('/:id', async (req, res) => {
  const { name, tag, rating } = req.body;
  const updated = await Player.findByIdAndUpdate(req.params.id, { name, tag, rating }, { new: true }).lean();
  if (!updated) return res.status(404).json({ error: 'Player not found' });
  res.json(updated);
});

// delete
router.delete('/:id', async (req, res) => {
  const deleted = await Player.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Player not found' });
  res.status(204).end();
});

module.exports = router;
