/* istanbul ignore file */
'use strict';

global.__basedir = __dirname;

const express = require('express');
const app = express();
const log = require('winston');
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json

const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.MONGODB_HOST}/userservice`);

let db = mongoose.connection;
db.on('error', function(error) {
    log.error(error);
    process.exit(1);
});

db.once('open', function() {
    log.info('connected to mongo');
});

app.get('/', (req, res) => res.send('I am alive'));
app.use('/api/v1/', require('./routes/v1/'));

module.exports = app.listen(3000, () => log.info('users api listening on port 3000!'));