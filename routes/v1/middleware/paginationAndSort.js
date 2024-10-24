'use strict';


/**
* Takes offset, sort and limit from the req.query and puts them in req.params.
*
* The limit and offset are converted integers.
*
* Limit is set to a default value of 10 and maximum of 100
* Offset is set a default value of 0
*/
module.exports = (req,res,next) => {
    let offset = !isNaN(req.query.offset) ? parseInt(req.query.offset) : 0;
    let limit = 10;
    if(!isNaN(req.query.limit)){
        let integerLimit = parseInt(req.query.limit);
        limit = (integerLimit <= 100) ? integerLimit : 100;
    } 
    req.params.sort = req.query.sort;
    req.params.limit = limit;
    req.params.offset = offset;
    delete req.query.sort;
    delete req.query.limit;
    delete req.query.offset;
    next();
};