const assert = require('chai').assert;
const request = require('supertest');
const app = require('../../main/app');
const agent = request(app);
const JwtUtil = require('@utils/jwt');
const jwtConfig = require('@config/jwt');
const User = require('@models/user');

const jwtUtil = new JwtUtil(jwtConfig);
const testUser = {
    name: 'testuser',
    email: 'test@email.com',
    password: 'password',
};

describe('User API tests', () => {
    describe('GET /users', () => {
        beforeEach((done) => {
            User.destroy({
                truncate: true,
            }).then(() => done());
        });

        it('200 status와 2명의 유저 정보를 포함한다', (done) => {
            User.create(testUser).then((user) => {
                const token = jwtUtil.generate(user);

                agent
                    .get('/users')
                    .set('Authorization', `Bearer ${token}`)
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

        it('토큰이 없으면 401 status를 응답한다', (done) => {
            agent
                .get('/users')
                .expect(401)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('존재하지 않는 유저이면 401 status를 응답한다', (done) => {
            testUser.id = 1004;
            const token = jwtUtil.generate(testUser);

            agent
                .get('/users')
                .set('Authorization', `Bearer ${token}`)
                .expect(401)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('토큰의 secret이 다르면 401 status를 응답한다', (done) => {
            User.create(testUser).then((user) => {
                const otherJwtConfig = { ...jwtConfig };
                otherJwtConfig.secret = 'other-secret';
                const otherJwtUtil = new JwtUtil(otherJwtConfig);
                const token = otherJwtUtil.generate(user);

                agent
                    .get('/users')
                    .set('Authorization', `Bearer ${token}`)
                    .expect(401)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        done();
                    });
            });
        });
    });
});
