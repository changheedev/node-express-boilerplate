require('module-alias/register');
const assert = require('chai').assert;
const request = require('supertest');
const app = require('@/app');
const agent = request(app);
const JwtUtil = require('@utils/jwt');
const jwtConfig = require('@config/jwt');
const User = require('@models/user');

const jwtUtil = new JwtUtil(jwtConfig);
const testUserEmail = 'testUser1@email.com';

describe('User API tests', () => {
    describe('GET /users', () => {
        it('200 status와 2명의 유저 정보를 포함한다', (done) => {
            User.findOne({ where: { email: testUserEmail } })
                .then((user) => {
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
                })
                .catch((err) => done(err));
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
            const notExistUser = {
                id: 1004,
                email: 'notExistUser@email.com',
                name: 'notExistUser',
            };
            const token = jwtUtil.generate(notExistUser);

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
            User.findOne({ where: { email: testUserEmail } })
                .then((user) => {
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
                })
                .catch((err) => done(err));
        });
    });
});
