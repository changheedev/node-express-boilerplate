const { Sequelize } = require('sequelize');
const dbConfig = require('@config/db.config');

const init = () => {
    const sequelize = new Sequelize({ ...dbConfig });
    return { sequelize };
};

module.exports = { init };
