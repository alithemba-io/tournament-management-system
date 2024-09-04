const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// GET /results
router.get('/', async (req, res) => {
  try {
    const results = await Result.findAll();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /results/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await Result.findByPk(req.params.id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Result not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /results
router.post('/', async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid result data' });
  }
});

// PUT /results/:id
router.put('/:id', async (req, res) => {
  try {
    const result = await Result.findByPk(req.params.id);
    if (result) {
      await result.update(req.body);
      res.json(result);
    } else {
      res.status(404).json({ error: 'Result not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid result data' });
  }
});

// DELETE /results/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Result.findByPk(req.params.id);
    if (result) {
      await result.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Result not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
