/*
    File: setupConnections.js
    Author: Fade
    Date: 2022-02-18

    Sets up all the connection handling for subservers and data transfer and data storage and validation.
*/

const log = require('./log.js');
const fs = require('fs');

const CONNECTIONS_DIR = './connections/';


module.exports.setup = function(app)
{

    log.message(`Setting up connections...`);

    // read the directory of connection files
    const dir = fs.readdirSync(CONNECTIONS_DIR);

    // loop through each file in the directory
    for(let i = 0; i < dir.length; i++) {

        const connPath = dir[i];

        log.message(`Preparing connection for ${connPath.toUpperCase()}`);

        // set up this specific connection
        require(`${CONNECTIONS_DIR}${connPath}`)(app);
    }

    log.message("Done setting up connections");
};


/* used by connection files to handle a GET connection */
module.exports.handleGet = function(app, path, callback) {

    // setup the handler at the path
    app.get(path, (req, res) => {

        log.message(`Received a GET connection at ${path}`);

        callback(req, res);

    });

    log.message(`Setup a new GET handler at ${path}`);

};


/* used by connection files to handle a POST connection */
module.exports.handleGet = function(app, path, callback) {

    // setup the handler at the path
    app.post(path, (req, res) => {

        log.message(`Received a POST connection at ${path}`);

        callback(req, res);

    });

    log.message(`Setup a new POST handler at ${path}`);

};