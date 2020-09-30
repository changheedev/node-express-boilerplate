const assert = require('chai').assert;
const request = require('supertest');
const app = require('../../main/app');
const User = require('@models/user');
const agent = request(app);

describe('Authentication API tests', () => {
    describe('POST /auth/authorize', () => {
        beforeEach((done) => {
            User.destroy({
                truncate: true,
            }).then(() => done());
        });

        it('로그인에 성공하면 JWT 토큰을 응답한다', (done) => {
            //given
            const payload = {
                email: 'test@email.com',
                password: 'password',
            };
            User.create({ ...payload, name: 'testuser' })
                .then(() => {
                    //when
                    agent
                        .post('/auth/authorize')
                        .send(payload)
                        //then
                        .expect(200)
                        .end((err, res) => {
                            if (err) {
                                return done(err);
                            }
                            assert.isNotNull(res.body.data.token);
                            done();
                        });
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
