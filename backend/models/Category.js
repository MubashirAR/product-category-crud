var mongoose = require("mongoose");

var CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  categoryId: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = CategorySchema;