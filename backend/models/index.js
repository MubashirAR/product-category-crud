var mongoose = require('mongoose');

var ProductSchema = require('./Product');
var CategorySchema = require('./Category');
var Product = mongoose.model('Product', ProductSchema);
var Category = mongoose.model('Category', CategorySchema);

module.exports = {
  Product: Product,
  Category: Category,
};
