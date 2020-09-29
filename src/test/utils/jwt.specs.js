const assert = require('chai').assert;
const JwtUtil = require('@/utils/jwt');
const testJwtConfig = {
    secret: 'token-secret',
    expiresIn: '10h',
    issuer: 'token-test.com',
};
const testUser = {
    id: 1,
    name: 'user1',
    email: 'test@email.com',
};

describe('JwtProvider util class tests', () => {
    describe('Generate token tests', () => {
        it('토큰은 문자열 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"로 시작한다', async () => {
            //given
            const jwtUtil = new JwtUtil(testJwtConfig);
            //when
            const token = await jwtUtil.generate(testUser);
            //then
            assert.equal(
                token.startsWith('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'),
                true,
            );
        });
    });

    describe('Verify token tests', () => {
        it('토큰 검증에 성공하면 토큰 정보가 반환된다', async () => {
            //given
            const jwtUtil = new JwtUtil(testJwtConfig);
            const token = await jwtUtil.generate(testUser);
            //when
            const claims = await jwtUtil.verify(token);
            //then
            assert.equal(claims.id, testUser.id);
            assert.equal(claims.username, testUser.name);
            assert.equal(claims.email, testUser.email);
        });

        it('secret이 동일하지 않으면 검증에 실패한다', async () => {
            //given
            const jwtUtil = new JwtUtil(testJwtConfig);
            const token = await jwtUtil.generate(testUser);

            //when
            const otherJwtConfig = { ...testJwtConfig };
            otherJwtConfig.secret = 'other-secret';
            const otherJwtUtil = new JwtUtil(otherJwtConfig);
            return new Promise((resolve, reject) => {
                otherJwtUtil
                    .verify(token)
                    //then
                    .then(() => reject())
                    .catch(() => resolve());
            });
        });

        it('issuer가 동일하지 않으면 검증에 실패한다', async () => {
            //given
            const jwtUtil = new JwtUtil(testJwtConfig);
            const token = await jwtUtil.generate(testUser);

            //when
            const otherJwtConfig = { ...testJwtConfig };
            otherJwtConfig.issuer = 'other-issuer.com';
            const otherJwtUtil = new JwtUtil(otherJwtConfig);
            return new Promise((resolve, reject) => {
                otherJwtUtil
                    .verify(token)
                    //then
                    .then(() => reject())
                    .catch(() => resolve());
            });
        });

        it('토큰이 만료되면 검증에 실패한다', async () => {
            //given
            const otherJwtConfig = { ...testJwtConfig };
            otherJwtConfig.expiresIn = '10'; //ms
            const jwtUtil = new JwtUtil(otherJwtConfig);
            const token = await jwtUtil.generate(testUser);

            //when
            return new Promise((resolve, reject) => {
                jwtUtil
                    .verify(token)
                    //then
                    .then(() => reject())
                    .catch(() => resolve());
            });
        });
    });
});
