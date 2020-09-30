const app = require('../main/app');

before((done) => {
    app.on('server-start', () => {
        done();
    });
});
