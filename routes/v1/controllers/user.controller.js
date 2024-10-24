'use strict';

/*
 * A controller to act as a bridge between the http API and the persistence layer for the user resource.
 * Should not contain any specific implementation of persistence to allow ease of testing and introduce
 * a degree of decoupling
 */

const log = require('winston');
const transformIdOutgoing = require('../transformIdOutgoing');


/**
 * async function that saves a user and calls the result on the res object
 * 
 * @param  {Object} req the request object, typically an express Request
 * @param  {Object} res the response object, typically an express Response
 */
module.exports.save = async (req, res) => {
    let userModel = require('../models/user.model.js');
    try {
        let user = await userModel.save(req.body);
        let transformed = transformIdOutgoing(user);
        res.status(201).json(transformed);    
    }catch(error){
        log.error(error);
        res.status(400).json({error:error.message});
    }
};


/**
 * async function that retrives a user user for an id that is expected in req.params calls the result on the res object
 *
 * Will return 404 if user cannot be found
 * 
 * @param  {Object} req the request object, should contain params.id typically an express Request
 * @param  {Object} res the response object, typically an express Response
 */
module.exports.get = async (req, res) => {
    //todo : should validate that id actually exists
    log.info(`Attempting to retrieve user for ${req.params.id}`);
    let userModel = require('../models/user.model.js');
    try {
        let user = await userModel.findByID(req.params.id);
        if(user){
            let transformed = transformIdOutgoing(user);
            res.status(200).json(transformed);
        } else {
            res.sendStatus(404);
        }
    }catch(error){
        log.error(error);
        res.status(400).json({error:error.message});
    }
};

/**
 * async function to delete a user by id that is expected in req.params, 204 if successful
 * 
 * @param  {Object} req the request object, should contain params.id typically an express Request
 * @param  {Object} res the response object, typically an express Response
 */
module.exports.delete = async (req, res) => {
    //todo : should validate that id actually exists
    log.info(`Attempting to delete user for ${req.params.id}`);
    let userModel = require('../models/user.model.js');
    try {
        let deleted = await userModel.delete(req.params.id);
        if(deleted){
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    }catch(error){
        log.error(error);
        res.status(400).json({error:error.message});
    }
};

/**
 * async function to put a user by id that is expected in req.params, 200 if already exists and updated
 * 201 if created.  Will also return the most up to date version of the document
 * 
 * @param  {Object} req the request object, should contain params.id typically an express Request
 * @param  {Object} res the response object, typically an express Response
 */
module.exports.put = async (req, res) => {
    //todo : should validate that id actually exists
    log.info(`Attempting to put user for ${req.params.id}`);

    let userModel = require('../models/user.model.js');
    try {
        if(req.body.id){
            //todo : should be handled by json schema validation or similar
            throw new Error('cannot have an id in the body of the request, must be the resource locator');
        }
        let updated = await userModel.update(req.params.id, req.body);
        if(updated){
            log.info(`Updated ${req.params.id}`);
            res.status(200).json(updated);
        } else {
            log.info(`Cannot find ${req.params.id}, creating`);
            req.body._id = req.params.id;
            await module.exports.save(req,res);
        }
    }catch(error){
        log.error(error);
        res.status(400).json({error:error.message});
    }
};


/**
 * async function that retrives a user user for an id that is expected in req.params calls the result on the res object
 *
 * Will return 404 if user cannot be found
 * 
 * @param  {Object} req the request object, should contain params.id typically an express Request
 * @param  {Object} res the response object, typically an express Response
 */
module.exports.list = async (req, res) => {
    //todo : should validate that id actually exists
    log.info('Attempting to query users for ', req.query);
    log.info('Attempting to query users with ', req.params);
    let userModel = require('../models/user.model.js');
    try {
        let users = await userModel.where(req.query, req.params.limit, req.params.offset,req.params.sort);
        let transformedUsers = users.map(user => transformIdOutgoing(user));
        res.status(200).json(transformedUsers);
    }catch(error){
        log.error(error);
        res.status(400).json({error:error.message});
    }
};