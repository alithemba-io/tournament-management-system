const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// GET /matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.findAll();
    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /matches/:id
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);
    if (match) {
      res.json(match);
    } else {
      res.status(404).json({ error: 'Match not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /matches
router.post('/', async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json(match);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid match data' });
  }
});

// PUT /matches/:id
router.put('/:id', async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);
    if (match) {
      await match.update(req.body);
      res.json(match);
    } else {
      res.status(404).json({ error: 'Match not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid match data' });
  }
});

// DELETE /matches/:id
router.delete('/:id', async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);
    if (match) {
      await match.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Match not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
