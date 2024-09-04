const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// GET /players
router.get('/', async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /players/:id
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (player) {
      res.json(player);
    } else {
      res.status(404).json({ error: 'Player not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /players
router.post('/', async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid player data' });
  }
});

// PUT /players/:id
router.put('/:id', async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (player) {
      await player.update(req.body);
      res.json(player);
    } else {
      res.status(404).json({ error: 'Player not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid player data' });
  }
});

// DELETE /players/:id
router.delete('/:id', async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (player) {
      await player.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Player not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
