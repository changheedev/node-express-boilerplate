const { Sequelize } = require('sequelize');
const dbConfig = require('@config/db');
const User = require('@models/user');

const sequelize = new Sequelize({
    ...dbConfig,
    define: {
        engine: 'InnoDB',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        underscored: true,
    },
});

const models = {
    user: User,
};

const initModels = (models, sequelize) => {
    Object.values(models).forEach((model) => {
        model.init(sequelize);
    });
};

const setAssociations = () => {
    //연관관계 설정
};

initModels(models, sequelize);
setAssociations();

module.exports = sequelize;
