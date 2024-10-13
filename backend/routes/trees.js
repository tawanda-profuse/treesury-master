require("dotenv").config();
const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const Tree = require("../models/tree");
const axios = require("axios");
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
const DEFAULT_IMAGE_URL =
  "https://static.vecteezy.com/system/resources/previews/006/851/591/original/tree-illustration-with-cartoon-style-free-vector.jpg";

// GET All Trees Route
router.get("/", async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 8;
  let query = Tree.find().sort({ tree_name: "asc" });

  // Search engine
  if (req.query.tree_name != null && req.query.tree_name != "") {
    query = query.regex("tree_name", new RegExp(req.query.tree_name, "i"));
  }

  // Pagination
  const totalTrees = await Tree.countDocuments(query);
  const trees = await query
    .select("tree_name coverImage coverImageType")
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  try {
    res.status(200).send({
      trees: trees,
      currentPage: page,
      totalPages: Math.ceil(totalTrees / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: `Error: ${error}`,
    });
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
    res.redirect(`${process.env.HREF}/trees/${tree.id}`);
  } catch (error) {
    console.error(error);
  }
});

async function imageUrlToBuffer(imageUrl) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arrayBuffer",
    });

    // Convert the image to a buffer
    const buffer = Buffer.from(response.data, "binary");

    return buffer;
  } catch (error) {
    console.error(`Error fetching image: ${error}`);
    throw error;
  }
}

async function saveCover(tree, coverEncoded) {
  if (!coverEncoded) {
    tree.coverImage = await imageUrlToBuffer(DEFAULT_IMAGE_URL);
    tree.coverImageType = "image/jpeg"; // Assuming default image is a jpeg
    return;
  }

  try {
    const cover = JSON.parse(coverEncoded);

    if (cover != null && imageMimeTypes.includes(cover.type)) {
      tree.coverImage = Buffer.from(cover.data, "base64");
      tree.coverImageType = cover.type;
    } else {
      tree.coverImage = await imageUrlToBuffer(DEFAULT_IMAGE_URL);
      tree.coverImageType = "image/jpeg";
    }
  } catch (error) {
    console.error("Error parsing coverEncoded: ", error);
    tree.coverImage = await imageUrlToBuffer(DEFAULT_IMAGE_URL);
    tree.coverImageType = "image/jpeg";
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
