const { Sequelize } = require('sequelize');
const dbConfig = require('@config/db');
const User = require('@models/user');

const models = {
    user: User,
};

const sequelize = new Sequelize({
    ...dbConfig,
    define: {
        engine: 'InnoDB',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        underscored: true,
    },
});

const initialize = () => {
    Object.values(models).forEach((model) => {
        model.init(sequelize);
    });
};

module.exports = {
    initialize,
    sequelize,
};
