const { DataTypes, Model } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        return super.init(
            {
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
            },
            {
                sequelize,
                tableName: 'users',
                engine: 'InnoDB',
                charset: 'utf8',
                indexes: [{ unique: true, fields: ['email'] }],
                timestamps: false,
            },
        );
    }
}

module.exports = User;
