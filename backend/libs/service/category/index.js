Models = require('../../../models');
ObjectId = require('mongoose').Types.ObjectId;
/**
 * 
 * @returns {String} [The text hello world]
 */
function hello(params) {
  return 'hello';
}
/**
 * 
 * @param {Object} params [params containing the pageNumber and limit]
 * @param {Function} callback [The callback with error or response]
 */
function get(params, callback) {
  
  // if (!validateGetInput(params))
  //   return callback({
  //     message: 'Invalid pageNumber or limit',
  //   });
  let { pageNumber = 0, limit = 10 } = params;
  let skip = pageNumber * limit;
  limit = Number(limit);
  delete params.pageNumber;
  delete params.limit;
  Models.Category.find(params)
    .skip(skip)
    .limit(limit)
    .exec(callback);
}
/**
 * 
 * @param {Object} params [The details of the document to be inserted]
 * @param {Function} callback [The callback function which receives the error and response]
 */
function insert(params, callback) {
  let query = validateInsertInput(params);
  Models.Category.create(query, (err, resp) => {
    if (err && err.code === 11000)
      return callback({
        message: 'Category ID must be unique!',
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
  Models.Category.updateOne({_id: ObjectId(params._id)}, payload, (err, resp) => {
    if (err && err.code === 11000)
      return callback({
        message: 'Category ID must be unique!',
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
  if(!ObjectId.isValid(params._id)) return callback({
    message: 'invalid id'
  })
  Models.Category.updateOne({_id: ObjectId(params._id)}, {isActive: false}, callback);
}

// Input Validation functions
function validateGetInput(params = {}) {
  let isValid = !isNaN(params.pageNumber) && !isNaN(params.limit);
  return isValid;
}
function validateInsertInput(params = {}) {
  let { name, categoryId } = params
  let payload = {
    name,
    categoryId
  }
  return payload;
}
function validateUpdateInput(params = {}) {
  let { name, categoryId } = params
  let payload = {
    name,
    categoryId
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
