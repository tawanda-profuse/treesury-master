const express = require('express');
const router = express.Router();
const Tree = require('../models/tree');
const Category = require('../models/category');
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif', 'image/jfif'];

// All Trees Route
router.get('/', async (req, res) => {
  let query = Tree.find();
  if (req.query.tree_name != null && req.query.tree_name != '') {
    query = query.regex('tree_name', new RegExp(req.query.tree_name, 'i'));
  }
  try {
    const trees = await query.exec();
    res.render('trees/index', {
      trees: trees,
      searchOptions: req.query
    });
  } catch {
    res.redirect('/');
  }
})

// New Product Route
router.get('/new', async (req, res) => { 
  renderNewPage(res, new Tree())
})

// Create Product Route
router.post('/', async (req, res) => {
  const tree = new Tree({ 
    tree_name: req.body.tree_name,
    category: req.body.category,
    description: req.body.description
  });
  saveCover(tree, req.body.cover);

  try {
    const newTree = await tree.save();
    res.redirect(`trees/${newTree.id}`);
  } catch {
    renderNewPage(res, tree, true);
  }
})

// Show Products Route
router.get('/:id', async (req, res) => {
  try {
    const tree = await Tree.findById(req.params.id)
                           .populate('category')
                           .exec()
    res.render('trees/show', {
      tree: tree
    });
  } catch {
    res.redirect('/')
  }
})

// Edit Product Route
router.get('/:id/edit', async (req, res) => {
  try {
    const tree = await Tree.findById(req.params.id)
    renderEditPage(res, tree)
  } catch {
    res.redirect('/')
  }
})

  // Update Product Route
  router.put('/:id', async (req, res) => {
    let tree;
  
    try {
      tree = await Tree.findById(req.params.id);
      tree.tree_name = req.body.tree_name;
      tree.category = req.body.category;
      tree.description = req.body.description;
      if (req.body.cover != null && req.body.cover !== '') {
        saveCover(tree, req.body.cover);
      }
      await tree.save();
      res.redirect(`/trees/${tree.id}`);
    } catch {
      if (tree != null) {
        renderEditPage(res, tree, true);
      } else {
        redirect('/')
      }
    }
  });

// Delete Product Page
router.delete('/:id', async (req, res) => {
  let tree;
  try {
    tree = await Tree.findById(req.params.id);
    await tree.remove();
    res.redirect('/trees');
  } catch {
    if (tree != null) {
      res.render('trees/show', {
        tree: tree
      })
    } else {
      res.redirect('/');
    }
  }
})

async function renderNewPage(res, tree, hasError = false) {
  renderFormPage(res, tree, 'new', hasError);
}
async function renderEditPage(res, tree, hasError = false) {
  renderFormPage(res, tree, 'edit', hasError);
}

async function renderFormPage(res, tree, form, hasError = false) {
  try {
    const categories = await Category.find({});
    const params = {
      categories: categories,
      tree: tree
    }
    // if (hasError) {
    //   if (form === 'edit') {
    //     params.errorMessage = 'Error updating product details'
    //   } 
    //   else {
    //     params.errorMessage = 'Error creating product'
    //   }
    // }
    res.render(`trees/${form}`, params)
  } catch {
    res.redirect('/trees')
  }
}

function saveCover(tree, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    tree.coverImage = new Buffer.from(cover.data, 'base64');
    tree.coverImageType = cover.type;
  }
}

module.exports = router;