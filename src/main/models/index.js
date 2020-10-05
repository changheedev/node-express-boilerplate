const UserModel = require('./user');

const models = {
    user: UserModel,
};

const initialize = (sequelize) => {
    Object.values(models).forEach((model) => {
        model.init(sequelize);
    });
};

module.exports = {
    initialize,
};
