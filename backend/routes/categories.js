require("dotenv").config();
const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const Tree = require("../models/tree");

// GET All Categories Route
router.get("/", async (req, res) => {
  const categories = await Category.find();
  try {
    res.json(categories);
  } catch (error) {
    console.error(error);
  }
});

// POST Category Route
router.post("/", async (req, res) => {
  const category = new Category(req.body);
  try {
    await category.save();
    console.log(category);
    res.redirect("/categories");
  } catch (error) {
    console.error(error);
  }
});

// GET one Category Route
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  const trees = await Tree.find({ category: category.id }).limit(6).exec();
  const categoryName = category.name;
  try {
    res.json({ categoryName, trees });
  } catch (error) {
    console.error(error);
  }
});

// Edit Category Route
router.get("/:id/edit", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.render("categories/edit", { category: category });
  } catch {
    res.redirect("/categories");
  }
});

// Edit Category Route
router.put("/:id", async (req, res) => {
  let category;
  try {
    category = await Category.findById(req.params.id);
    category.name = req.body.name;
    await category.save();
    res.redirect(`/categories/${category.id}`);
  } catch (error) {
    if (category == null) {
      console.error("No category found.");
    } else {
      console.error(error);
    }
  }
});

// Delete Category Route
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  Category.findByIdAndDelete(id)
    .then((result) => {
      console.log("Category deleted successfully.");
      res.redirect(`${process.env.HREF}/categories`);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
