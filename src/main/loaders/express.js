const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('@routes/index');
const passport = require('passport');
const passportLoader = require('@/loaders/passport');

const expressLoader = (app) => {
    app.use(logger('dev'));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(passport.initialize());
    passportLoader();
    app.use('/', indexRouter);
};

module.exports = expressLoader;
