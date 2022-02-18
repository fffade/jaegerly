/*
    File: index.js
    Author: Fade
    Date: 2022-02-18

    The main file to run the central server and all its components.
*/

const express = require('express');
const env = require('dotenv');

env.config({path: './.env'}); // load environment variables

const app = express();

app.use(express.static('./view/')); // deploy html in the view folder

// start the application at the defined port in .env
app.listen(process.env.PORT, () => {

    console.log(`Server running on port ${process.env.PORT}`);
});