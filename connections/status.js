/*
    File: connections/status.js
    Author: Fade
    Date: 2022-02-18

    Sets up the connection for GETing the server status
*/

const connections = require('../setupConnections.js');


module.exports = function(app)
{

    connections.handleGet(app, "/status/", (req, res) => {

        res.send({"status": "healthy", "ip": req.ip});
    });

};