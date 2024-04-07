const express = require('express');
const router = express.Router();
const Tree = require('../models/tree')

// Welcome Page
router.get('/', (req, res) => {
    res.render('landing', { layout: 'landing' }); // I decided to use this because it disables the layouts from the landing page
});

// Landing Page
router.get('/index', (req, res) => {
  res.render('index', { layout: 'index' }); // I decided to use this because it disables the layouts from the index page
});  

// Dashboard
router.get('/roots', async (req, res) => {
  let trees
  try {
    trees = await Tree.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch {
    trees = []
  }
  res.render('roots', {
    trees: trees
  })
});

module.exports = router;



