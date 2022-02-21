/*
    File: log.js
    Author: Fade
    Date: 2022-02-18

    Functions to log a message or error.
*/

const fs = require('fs');

const LOG_FILE = "logs.txt"; // specifies the file to log errors and messages to


const log =
{
    getTime: function() {
        return new Date(Date.now()).toString().split("Eastern Standard Time").join('EST');
    },

    message: function(text) {

        const fullText = `[${this.getTime()}] ${text}`;

        console.log(fullText);

        fs.writeFileSync(LOG_FILE, fullText + "\n");
    },

    err: function(text) {

        const fullText = `[${this.getTime()}] ERROR!: ${text}`;

        console.log(fullText);

        fs.writeFileSync(LOG_FILE, fullText + "\n");
    }
};

module.exports = log;