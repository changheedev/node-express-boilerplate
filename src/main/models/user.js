const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
    static init(sequelize) {
        return super.init(scheme, { sequelize, ...initOptions });
    }

    verifyPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

const scheme = {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: new DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
};

const initOptions = {
    tableName: 'users',
    indexes: [{ unique: true, fields: ['email'] }],
    timestamps: false,
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        },
    },
};

module.exports = User;
