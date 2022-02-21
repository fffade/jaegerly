/*
    File: connections/dataHandler.js
    Author: Fade
    Date: 2022-02-19

    Sets up the connections for managing data with the server.
*/

const connections = require('../setupConnections.js');
const data = require('../data.js');


module.exports = function(app)
{

    // set up receiving data from the server
    connections.handleGet(app, "/data/:name", (req, res) => {

        // check if the data compartment exists
        if(!data.compExists(req.params.name)) {
            return res.send({"Error": "Compartment does not exist"});
        }

        const comp = data.readComp(req.params.name);

        res.send({"name": req.params.name,
                  "entries": Object.keys(comp).length,
                  "data": comp});
    });


    // set up receiving data from the server
    connections.handlePost(app, "/data/:name/save/", (req, res) => {

        // check if the data compartment exists
        if(!data.compExists(req.params.name)) {
            data.newComp(req.params.name);
        }

        const comp = data.readComp(req.params.name);

        res.send(req.body);
        
    });
};