
Models = require('../../../models');

function hello(params) {
  return 'hello'
}
/**
 * 
 * @param {Object} params [params containing the pageNumber and limit]
 * @param {Function} callback [The callback with error or response]
 */
async function get(params, callback) {

  try {
    if (!validateGetInput(params))
      return callback({
        message: 'Invalid pageNumber or limit',
      });
    let skip = params.pageNumber * params.limit;
    let limit = Number(params.limit);
    delete params.pageNumber;
    delete params.limit;
    console.log({params});
    
    let count = await Models.Product.find(params)
      .populate('_categoryId')
      .count()
      .exec();
    console.log({count});
    
    let products = await Models.Product.find(params)
      .populate('_categoryId')
      .skip(skip)
      .limit(limit)
      .exec();
    callback(null, {count, products});
  } catch (error) {
    callback(error);
  }
  
}
function insert(params, callback){
  console.log({params});
  let query = validateInsertInput(params)
  Models.Product.create(query,  (err, resp) => {
    console.log({err});
    
    if (err && err.code === 11000)
      return callback({
        message: 'Product ID must be unique!',
      });
    callback(err, resp);
  });
}
/**
 * 
 * @param {Object} params [The details of the document to be updated]
 * @param {Function} callback [The callback function which receives the error and response]
 */
function update(params, callback) {
  let payload = validateUpdateInput({...params})
  
  Models.Product.updateOne({_id: ObjectId(params._id)}, payload, (err, resp) => {
    if (err && err.code === 11000)
      return callback({
        message: 'Product ID must be unique!',
      });
    callback(err, resp);
  });
}
/**
 * 
 * @param {Object} params [The details of the document to be deleted]
 * @param {Function} callback [The callback function which receives the error and response]
 */
function remove(params, callback) {
  Models.Product.deleteOne(params, callback);
}

// Input Validation functions
function validateGetInput(params = {}) {
  let isValid = !isNaN(params.pageNumber) && !isNaN(params.limit);
  return isValid;
}
function validateUpdateInput(params = {}) {
  let { name, _categoryId, productId } = params
  let payload = {
    name,
    productId,
    _categoryId
  }
  return payload;
}
function validateInsertInput(params = {}) {
  let { name, productId, _categoryId } = params
  let payload = {
    name,
    productId,
    _categoryId
  }
  return payload;
}
module.exports = {
  hello,
  get,
  insert,
  update,
  remove,
};
