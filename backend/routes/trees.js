require("dotenv").config();
const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const Tree = require("../models/tree");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif", "image/jfif"];

// GET All Trees Route
router.get("/", async (req, res) => {
  const trees = await Tree.find();
  try {
    res.json(trees);
  } catch (error) {
    console.error(error);
  }
});

// GET single Product Route
router.get("/:id", async (req, res) => {
  const tree = await Tree.findById(req.params.id);
  const category = await Category.findById(tree.category._id);
  const categoryName = category.name;
  try {
    res.json({ categoryName, tree });
  } catch (error) {
    console.error(error);
  }
});

// GET Edit Product Route
router.get("/:id/edit", async (req, res) => {
  const tree = await Tree.findById(req.params.id);
  try {
    res.json(tree);
  } catch (error) {
    console.error(error);
  }
});

// POST Product Route
router.post("/", async (req, res) => {
  const tree = new Tree(req.body);
  saveCover(tree, req.body.cover);

  try {
    await tree.save();
    res.redirect(`${process.env.HREF}/trees/${tree.id}`);
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", async (req, res) => {
  let tree;

  try {
    tree = await Tree.findById(req.params.id);
    tree.tree_name = req.body.tree_name;
    tree.category = req.body.category;
    tree.description = req.body.description;
    if (req.body.cover != null && req.body.cover !== "") {
      saveCover(tree, req.body.cover);
    }
    await tree.save();
    res.redirect(`/trees/${tree.id}`);
  } catch (error) {
    console.error(error);
  }
});

function saveCover(tree, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    tree.coverImage = new Buffer.from(cover.data, "base64");
    tree.coverImageType = cover.type;
  }
}

// Delete Product Page
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Tree.findByIdAndDelete(id);
    console.log("Tree deleted successfully.");
    res.redirect(`${process.env.HREF}/trees`);
  } catch (error) {
    console.log("Error deleting tree:", error);
    res.status(500).json({ message: "Failed to delete tree" });
  }
});

module.exports = router;
