const assert = require('chai').assert;
const request = require('supertest');
const app = require('../main/app');
const agent = request(app);

describe('User API tests', () => {
    describe('GET /users', () => {
        it('200 status와 2명의 유저 정보를 포함한다.', (done) => {
            agent
                .get('/users')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    assert.equal(res.body.length, 2);
                    done();
                });
        });
    });
});
