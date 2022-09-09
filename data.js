/*
    File: data.js
    Author: Fade
    Date: 2022-02-19

    Handles and stores data locally.
*/

const fs = require('fs');
const log = require('./log.js');

const DATA_DIR = './data/';

// returns a list of the name of every existing compartment
function getCompartments() {

    // read the directory and chop off extension of each file
    const dirNames = fs.readdirSync(DATA_DIR).map((file) => file.replace(".json", ""));

    return dirNames;
}

// checks if a compartment by a name exists
function compExists(name) {

    // read the data directory
    const dir = fs.readdirSync(DATA_DIR);

    return dir.includes(`${name}.json`);
}

// creates a new data compartment for storing separate data in
function newComp(name) {

    // see if the compartment already exists
    if(compExists(name)) {
        return log.err(`Could not create data comp '${name}', already exists`)
    }

    fs.writeFileSync(`${DATA_DIR}${name}.json`, JSON.stringify({}));

    log.message(`Successfully created new data comp: ${name}`);
}

// completely deletes a data compartment
function deleteComp(name) {

    // see if the compartment exists
    if(!compExists(name)) {
        return log.err(`Could not delete comp '${name}', does not exist`)
    }

    fs.rmSync(`${DATA_DIR}${name}.json`);

    log.message(`Successfully deleted data comp '${name}'`);
}

// writes to a section of a data compartment
function writeToComp(name, key, value) {

    // see if the compartment exists
    if(!compExists(name)) {
        return log.err(`Could not edit comp '${name}', does not exist`)
    }

    let data = JSON.parse(fs.readFileSync(`${DATA_DIR}${name}.json`));

    data[key] = value;

    // deleteComp(name);

    fs.writeFileSync(`${DATA_DIR}${name}.json`, JSON.stringify(data));

    log.message(`Successfully wrote data to comp '${name}'`);
}

// erases a variable in a data compartment
function eraseFromComp(name, key) {

    // see if the compartment exists
    if(!compExists(name)) {
        return log.err(`Could not edit comp '${name}', does not exist`)
    }

    let data = JSON.parse(fs.readFileSync(`${DATA_DIR}${name}.json`));

    delete data[key];

    // deleteComp(name);

    fs.writeFileSync(`${DATA_DIR}${name}.json`, JSON.stringify(data));

    log.message(`Successfully erased data from comp '${name}'`);
}

// reads a compartment of its values
function readComp(name) {
    
    // see if the compartment exists
    if(!compExists(name)) {
        return log.err(`Could not read comp '${name}', does not exist`)
    }

    let data = JSON.parse(fs.readFileSync(`${DATA_DIR}${name}.json`));

    return data;
}

// export the entire module
module.exports = {
    getCompartments: getCompartments,
    compExists: compExists,
    newComp: newComp,
    deleteComp: deleteComp,
    writeToComp: writeToComp,
    eraseFromComp: eraseFromComp,
    readComp: readComp
};