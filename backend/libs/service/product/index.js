Models = require('../../../models');
let { ObjectId } = require('mongoose').Types

function hello(params) {
  return 'hello';
}
/**
 *
 * @param {Object} params [params containing the pageNumber and limit]
 * @param {Function} callback [The callback with error or response]
 */
async function get(params, callback) {
  try {
    let { pageNumber = 0, limit = 10 } = params;
    // if (!validateGetInput(params))
    //   return callback({
    //     message: 'Invalid pageNumber or limit',
    //   });
    let skip = pageNumber * limit;
    limit = Number(limit);
    delete params.pageNumber;
    delete params.limit;
    if(params._id && ObjectId.isValid(params._id)) {
      params._id = ObjectId(params._id);
    }
    console.log({ params });

    let res = await Models.Product.aggregate([
      {
        $facet: {
          count: [
            {
              $match: params,
            },
            { $count: "ROOT"}
          ],
          products: [
            {
              $match: params,
            },
            {
              $lookup: {
                from: 'categories',
                localField: '_categoryId',
                foreignField: '_id',
                as: '_categoryId',
              },
            },
            { $unwind: '$_categoryId'}
          ],
        },
      },
    ])
    let count = res && res.length && res[0] && res[0]['count'] || [];
    count = count.length && count[0] && count[0]['ROOT'];
    console.log({ count });

    let products =   res && res.length && res[0] && res[0]['products'] || [];
    callback(null, { count, products });
  } catch (error) {
    callback(error);
  }
}
function insert(params, callback) {
  console.log({ params });
  let query = validateInsertInput(params);
  Models.Product.create(query, (err, resp) => {
    console.log({ err });

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
  let payload = validateUpdateInput({ ...params });

  Models.Product.updateOne({ _id: ObjectId(params._id) }, payload, (err, resp) => {
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
  let { name, _categoryId, productId } = params;
  let payload = {
    name,
    productId,
    _categoryId,
  };
  return payload;
}
function validateInsertInput(params = {}) {
  let { name, productId, _categoryId } = params;
  let payload = {
    name,
    productId,
    _categoryId,
  };
  return payload;
}
module.exports = {
  hello,
  get,
  insert,
  update,
  remove,
};
