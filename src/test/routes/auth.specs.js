require('module-alias/register');
const assert = require('chai').assert;
const request = require('supertest');
const app = require('@/app');
const agent = request(app);

describe('Authentication API tests', () => {
    describe('POST /auth/authorize', () => {
        it('로그인에 성공하면 JWT 토큰을 응답한다', (done) => {
            //given
            const payload = {
                email: 'testUser1@email.com',
                password: 'password',
            };

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
        });
    });
});
