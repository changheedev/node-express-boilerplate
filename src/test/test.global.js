require('module-alias/register');
const app = require('@/app');
const TestHelper = require('./test-helper');

before((done) => {
    app.on('server-start', async () => {
        await TestHelper.initTestUser();
        done();
    });
});
