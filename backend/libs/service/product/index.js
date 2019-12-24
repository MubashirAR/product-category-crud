
Models = require('../../../models');

function hello(params) {
  return 'hello'
}
/**
 * 
 * @param {Object} params [params containing the pageNumber and limit]
 * @param {Function} callback [The callback with error or response]
 */
function get(params, callback) {
  
  if (!validateGetInput(params))
    return callback({
      message: 'Invalid pageNumber or limit',
    });
  let skip = params.pageNumber * params.limit;
  let limit = Number(params.limit);
  Models.Product.find()
    .skip(skip)
    .limit(limit)
    .exec(callback);
}
function insert(params, callback){
  console.log({params});
  
  Models.Product.create(params,  (err, resp) => {
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
  let { name } = params
  let payload = {
    name
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
