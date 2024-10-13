const mongoose = require("mongoose");
const axios = require("axios");

const treeSchema = new mongoose.Schema({
  tree_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: Buffer,
  },
  coverImageType: {
    type: String,
    default: "image/jpeg",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
});

async function imageUrlToBuffer(imageUrl) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    // Convert the image data to a Buffer
    const buffer = Buffer.from(response.data, "binary");

    return buffer;
  } catch (error) {
    console.error(`Error fetching image: ${error}`);
    throw error;
  }
}

// Set default value for picture
treeSchema.pre("save", async function (next) {
  if (!this.coverImage || !this.coverImage.length) {
    this.coverImage = new Buffer.from(
      await imageUrlToBuffer(
        "https://static.vecteezy.com/system/resources/previews/006/851/591/original/tree-illustration-with-cartoon-style-free-vector.jpg"
      )
    );
  }
  next();
});

treeSchema.virtual("coverImagePath").get(function () {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${
      this.coverImageType
    };charset=utf-8;base64,${this.coverImage.toString("base64")}`;
  }
});

treeSchema.index({ tree_name: 1 });
treeSchema.index({ coverImage: 1 });
treeSchema.index({ coverImageType: 1 });

const Tree = mongoose.model("Tree", treeSchema);

module.exports = Tree;
