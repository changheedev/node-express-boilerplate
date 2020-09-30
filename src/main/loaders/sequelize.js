const { Sequelize } = require('sequelize');
const dbConfig = require('@config/db');
const models = require('@models');
const eventBus = require('@events/event-bus');

const sequelizeLoader = () => {
    const sequelize = new Sequelize({ ...dbConfig });

    Object.values(models).forEach((model) => {
        model.init(sequelize);
    });

    if (process.env.NODE_ENV !== 'production') {
        const syncOption =
            process.env.NODE_ENV === 'development' ? {} : { force: true };
        sequelize.sync(syncOption).then(() => {
            eventBus.emit('sequelize-load');
        });
    }
};

module.exports = sequelizeLoader;
