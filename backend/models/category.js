const mongoose = require("mongoose");
const Tree = require("./tree");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

categorySchema.pre("remove", function (next) {
  Tree.find({ category: this.id }, (err, trees) => {
    if (err) {
      next(err);
    } else if (trees.length > 0) {
      next(new Error("This category still has items"));
    } else {
      next();
    }
  });
});

categorySchema.index({ name: 1 });

module.exports = mongoose.model("Category", categorySchema);
