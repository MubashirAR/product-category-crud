router = require('express').Router();
category = require('../libs/service/category')

router.get('/', function(req, res) {
  category.get(req.query, (err, data) => {
    if(err) return res.status(500).json({
      message: err.message || 'Error while getting category list',
      error: err
    });
    res.status(201).json({
      message: 'successfully fetched categories',
      data
    })
  });
});
router.post('/', function(req, res) {
  category.insert(req.body, (err, data) => {
    if(err) return res.status(500).json({
      message: err.message || 'Error while adding category',
      error: err
    });
    res.status(201).json({
      message: 'successfully added category',
      data
    })
  });
});
router.put('/', function(req, res) {
  category.update(req.body, (err, data) => {
    if(err) return res.status(500).json({
      message: err.message || 'Error while updating category',
      error: err
    });
    res.status(201).json({
      message: 'successfully added category',
      data
    })
  });
});
router.delete('/', function(req, res) {
  console.log({query: req.query});
  
  category.remove(req.query, (err, data) => {
    if(err) return res.status(500).json({
      message: err.message || 'Error while removing category',
      error: err
    });
    res.status(201).json({
      message: 'successfully added category',
      data
    })
  });
});
module.exports = router;
