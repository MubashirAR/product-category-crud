router = require('express').Router();
product = require('../libs/service/product');

router.get('/', function(req, res) {
  product.get(req.query, (err, data) => {
    if(err) return res.status(500).json({
      message: err.message || 'Error while getting product list',
      error: err
    });
    res.status(201).json({
      message: 'successfully fetched categories',
      data
    })
  });
});
router.post('/', function(req, res) {
  product.insert(req.body, (err, data) => {
    if(err) return res.status(500).json({
      message: err.message || 'Error while adding product',
      error: err
    });
    res.status(201).json({
      message: 'successfully added product',
      data
    })
  });
});
router.put('/', function(req, res) {
  product.update(req.body, (err, data) => {
    if(err) return res.status(500).json({
      message: err.message || 'Error while editing product',
      error: err
    });
    res.status(201).json({
      message: 'successfully added product',
      data
    })
  });
});
router.delete('/', function(req, res) {
  product.remove(req.query, (err, data) => {
    if(err) return res.status(500).json({
      message: err.message || 'Error while deleting product',
      error: err
    });
    res.status(201).json({
      message: 'successfully added product',
      data
    })
  });
});
module.exports = router;
