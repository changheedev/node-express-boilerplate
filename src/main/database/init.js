const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const dbConfig = require('@config/db');

const init = () => {
    const sequelize = new Sequelize({ ...dbConfig });
    const modelsDirectory = path.resolve(__dirname, '../models');

    const models = Object.assign(
        {},
        ...fs.readdirSync(modelsDirectory).map((file) => {
            const model = require('@models/' + file);
            return {
                [model.name]: model.init(sequelize),
            };
        }),
    );

    if (process.env.NODE_ENV !== 'production') {
        const syncOption =
            process.env.NODE_ENV === 'development' ? {} : { force: true };
        sequelize.sync(syncOption);
    }

    return { models, sequelize };
};

module.exports = { init };
