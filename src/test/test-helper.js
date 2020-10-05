const User = require('@models/user');

const initTestUser = () => {
    const user1 = {
        email: 'testUser1@email.com',
        name: 'testUser1',
        password: 'password',
    };
    return User.create(user1);
};

module.exports = {
    initTestUser,
};
