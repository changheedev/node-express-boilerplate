const sequelizeLoader = require('@/loaders/sequelize');
const expressLoader = require('@/loaders/express');

const init = async (app) => {
    await sequelizeLoader();
    expressLoader(app);
};

module.exports = { init };
