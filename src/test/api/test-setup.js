require('module-alias/register');
const app = require('@/app');
const TestHelper = require('../test-helper');

exports.mochaHooks = {
    beforeAll(done) {
        app.on('server-start', async () => {
            await TestHelper.initTestUser();
            done();
        });
    },
    afterAll(done) {
        const sequelize = require('@models');
        sequelize
            .close()
            .then(() => done())
            .catch((err) => done(err));
    },
};
