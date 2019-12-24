var router = require('express').Router();

var productRoutes = require('./product');
var categoryRoutes = require('./category');

router.use('/category', categoryRoutes);
router.use('/product', productRoutes);

module.exports = router;