var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true,
    unique: true
  },
  _categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
});

module.exports = ProductSchema;