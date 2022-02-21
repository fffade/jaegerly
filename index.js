/*
    File: index.js
    Author: Fade
    Date: 2022-02-18

    The main file to run the central server and all its components.
*/

const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const data = require('./data.js');
const log = require('./log.js');

env.config({path: './.env'}); // load environment variables

const app = express();

app.use(bodyParser.json());
app.use(express.static('./view/')); // deploy html in the view folder


require('./setupConnections.js').setup(app); // set up connection handlers


// start the application at the defined port in .env
app.listen(process.env.PORT, () => {

    log.message(`Server running on port ${process.env.PORT}`);

    data.eraseFromComp('test', 'newValue4');
}); 