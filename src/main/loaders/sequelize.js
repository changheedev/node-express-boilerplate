const { Sequelize } = require('sequelize');
const dbConfig = require('@config/db');
const Models = require('@models');

const sequelizeLoader = async () => {
    const sequelize = new Sequelize({
        ...dbConfig,
        define: {
            engine: 'InnoDB',
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            underscored: true,
        },
    });

    Models.initialize(sequelize);

    if (process.env.NODE_ENV !== 'production') {
        await syncTables(sequelize);
    }
};

const syncTables = async (sequelize) => {
    const syncOption = process.env.NODE_ENV === 'test' ? { force: true } : {};
    await sequelize.sync(syncOption);
};

module.exports = sequelizeLoader;
