const express = require('express');
const router = express.Router();
const { models } = require('../db');

const Tournament = models.Tournament;

// list tournaments
router.get('/', async (req, res) => {
  const rows = await Tournament.find().sort({ _id: -1 }).lean();
  res.json(rows);
});

// get one
router.get('/:id', async (req, res) => {
  const row = await Tournament.findById(req.params.id).lean();
  if (!row) return res.status(404).json({ error: 'Tournament not found' });
  res.json(row);
});

// create
router.post('/', async (req, res) => {
  const { title, description, start_date, end_date } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const created = await Tournament.create({ title, description, startDate: start_date, endDate: end_date });
  res.status(201).json(created);
});

// update
router.put('/:id', async (req, res) => {
  const { title, description, start_date, end_date } = req.body;
  const updated = await Tournament.findByIdAndUpdate(req.params.id, { title, description, startDate: start_date, endDate: end_date }, { new: true }).lean();
  if (!updated) return res.status(404).json({ error: 'Tournament not found' });
  res.json(updated);
});

// delete
router.delete('/:id', async (req, res) => {
  const deleted = await Tournament.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Tournament not found' });
  res.status(204).end();
});

module.exports = router;
