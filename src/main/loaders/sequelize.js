const { Sequelize } = require('sequelize');
const dbConfig = require('@config/db');
const models = require('@models');

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

    Object.values(models).forEach((model) => {
        model.init(sequelize);
    });

    if (process.env.NODE_ENV !== 'production') {
        const syncOption =
            process.env.NODE_ENV === 'test' ? { force: true } : {};
        await sequelize.sync(syncOption);
    }
};

module.exports = sequelizeLoader;
