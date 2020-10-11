require('module-alias/register');
require('dotenv').config();
const sequelizeLoader = require('@/loaders/sequelize');
const TestHelper = require('../test-helper');

exports.mochaHooks = {
    beforeAll(done) {
        sequelizeLoader()
            .then(async () => {
                await TestHelper.initTestUser();
                done();
            })
            .catch((err) => done(err));
    },
    afterAll(done) {
        const sequelize = require('@models');
        sequelize
            .close()
            .then(() => done())
            .catch((err) => done(err));
    },
};
