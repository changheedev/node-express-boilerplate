const { initialize, sequelize } = require('@models');

const sequelizeLoader = async () => {
    initialize();
    if (process.env.NODE_ENV !== 'production') {
        await syncTables();
    }
};

const syncTables = async () => {
    const syncOption = process.env.NODE_ENV === 'test' ? { force: true } : {};
    await sequelize.sync(syncOption);
};

module.exports = sequelizeLoader;
