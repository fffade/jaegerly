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


    // set up saving new data from the server
    connections.handlePost(app, "/data/:name/save/", (req, res) => {

        // check if the data compartment exists
        if(!data.compExists(req.params.name)) {
            data.newComp(req.params.name);
        }

        // run through variables to save and replace them
        for(let saveKey in req.body) {
            data.writeToComp(req.params.name, saveKey, req.body[saveKey]);
        }

        // return the new body
        const comp = data.readComp(req.params.name);

        res.send({
            message: `Successfully saved data to compartment`,
            name: req.params.name,
            body: comp
        });
    });

    // set up resetting data from the server
    connections.handlePost(app, "/data/:name/empty/", (req, res) => {

        // check if the data compartment exists
        if(!data.compExists(req.params.name)) {
            return res.send({"Error": "Compartment does not exist"});
        }

        // delete the compartment
        data.deleteComp(req.params.name);

        res.send({
            message: `Successfully deleted compartment`,
            name: req.params.name
        });
    });

    // set up erasing data points from the server
    connections.handlePost(app, "/data/:name/erase/:key", (req, res) => {

        // check if the data compartment exists
        if(!data.compExists(req.params.name)) {
            return res.send({"Error": "Compartment does not exist"});
        }

        const keyValue = data.readComp(req.params.name)[req.params.key];

        // erase the value
        data.eraseFromComp(req.params.name, req.params.key); 

        res.send({
            message: `Successfully erased value '${req.params.key}'`,
            name: req.params.name,
            key: req.params.key,
            oldValue: keyValue
        });
    });
};