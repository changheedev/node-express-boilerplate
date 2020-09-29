require('dotenv').config();

module.exports = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'username',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'dbname',
    dialect: process.env.SEQ_DIALECT || 'mysql',
    pool: {
        max: Number(process.env.SEQ_POOL_MAX) || 10, //최대 커넥션 수
        min: Number(process.env.SEQ_POOL_MIN) || 0, //최소 커넥션 수
        idle: Number(process.env.SEQ_POOL_IDLE) || 10000, //커넥션 최대 idle 시간 (밀리 초)
    },
};
