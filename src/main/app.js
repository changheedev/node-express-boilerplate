require('module-alias/register');
require('dotenv').config();
const express = require('express');
const initializeLoaders = require('@loaders');

const app = express();
initializeLoaders.init(app);

module.exports = app;
