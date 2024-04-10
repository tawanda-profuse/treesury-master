const mongoose = require('mongoose')

const treeSchema = new mongoose.Schema({
  tree_name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  coverImage: {
    type: Buffer,
  }, 
  coverImageType: {
    type: String,
    // required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  }
})

treeSchema.virtual('coverImagePath').get(function() {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})

module.exports = mongoose.model('Tree', treeSchema)
