class SequelizeLoaderError extends Error {
    constructor(msg) {
        super(msg);
    }
}

const sequelizeLoader = async () => {
    const sequelize = require('@models');
    try {
        await syncTables(sequelize);
    } catch (err) {
        await sequelize.close();
        throw err;
    }
};

const syncTables = async (sequelize) => {
    const transaction = await sequelize.transaction();
    try {
        if (process.env.NODE_ENV === 'test') {
            await syncTablesInTestEnvironment(sequelize);
        } else {
            const syncOption =
                process.env.NODE_ENV === 'development'
                    ? { alter: { drop: false } }
                    : {};
            await sequelize.sync(syncOption);
        }
        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw new SequelizeLoaderError(
            `Table synchronization failed\n${err.message}`,
        );
    }
};

const syncTablesInTestEnvironment = async (sequelize) => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
};

module.exports = sequelizeLoader;
