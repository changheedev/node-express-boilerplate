const sequelizeLoader = require('@/loaders/sequelize');
const expressLoader = require('@/loaders/express');

const init = (app) => {
    sequelizeLoader();
    expressLoader(app);
};

module.exports = { init };
