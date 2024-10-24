'use strict';

const mongoose = require('mongoose');

/**
 * Calls mongoose and mongodb to save a user.  
 * @param  {Object} user js object representation of a user, to be passed to mongoose User constructor
 * @return {Object} the saved mongoose User model
 */
module.exports.save = (user) => {
    const User = require('../schemas/user.schema.js');
    let newUser = new User(user);
    return newUser.save();
};


/**
 * Calls mongoose and mongodb to findById a user 
 * @param  {String} user the _id of a mongoose object
 * @return {Object} the found object
 */
module.exports.findByID = (id) => {
    const User = require('../schemas/user.schema.js');
    return mongoose.Types.ObjectId.isValid(id) ? User.findById(id) : null;
};

/**
 * Calls mongoose and mongodb to findByIdAndRemove a user 
 * @param  {String} user the _id of a mongoose object
 * @return {Object} the found object
 */
module.exports.delete = (id) => {
    const User = require('../schemas/user.schema.js');
    return mongoose.Types.ObjectId.isValid(id) ? User.findByIdAndRemove(id) : null;
};

/**
 * Calls mongoose and mongodb to findByIdAndUpdate a user 
 * @param  {String} user the _id of a mongoose object
 * @param  {Object} new values to update
 * @return {Object} the updated object with new values
 */
module.exports.update = (id, user) => {
    const User = require('../schemas/user.schema.js');
    return mongoose.Types.ObjectId.isValid(id) ? User.findByIdAndUpdate(id, user, {new:true}) : null;
};

/**
 * Calls mongoose and mongodb to find users
 * @param  {Object} query the query to search for
 * @return {Array}  the list of users, currently limited to 100
 */
/* istanbul ignore next */
module.exports.where = (query, limit = 10, offset = 0 ,sort = '') => {
    //todo unit test this
    const User = require('../schemas/user.schema.js');
    return User.find(query).skip(offset).limit(limit).sort(sort);
};

