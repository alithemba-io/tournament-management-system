const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');

// GET /tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.findAll();
    res.json(tournaments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /tournaments/:id
router.get('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findByPk(req.params.id);
    if (tournament) {
      res.json(tournament);
    } else {
      res.status(404).json({ error: 'Tournament not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /tournaments
router.post('/', async (req, res) => {
  try {
    const tournament = await Tournament.create(req.body);
    res.status(201).json(tournament);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid tournament data' });
  }
});

// PUT /tournaments/:id
router.put('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findByPk(req.params.id);
    if (tournament) {
      await tournament.update(req.body);
      res.json(tournament);
    } else {
      res.status(404).json({ error: 'Tournament not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid tournament data' });
  }
});

// DELETE /tournaments/:id
router.delete('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findByPk(req.params.id);
    if (tournament) {
      await tournament.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Tournament not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;