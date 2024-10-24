'use strict';

const _ = require('lodash');

/**
* If outgoing object contains _id, it is replaced with a property called id with the same value.  _id is removed.
* If the object has a function called toObject, that is called before cloning, this is the case for mongoose model objects.
* @param  {Object} objectToBeTransformed object to be transformed
* @return {Object}                a copy of the object with _id converted to id
*/
module.exports = (objectToBeTransformed) => {
    let clonedOutgoing = {};
    if(objectToBeTransformed){
        let normalisedObject  = typeof objectToBeTransformed.toObject === 'function' ? objectToBeTransformed.toObject() : objectToBeTransformed;
        clonedOutgoing = _.cloneDeep(normalisedObject);
        if(normalisedObject._id){
            clonedOutgoing.id = normalisedObject._id.toString();
            delete clonedOutgoing._id;
        }  
    } 
    return clonedOutgoing;
};