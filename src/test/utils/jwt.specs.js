const assert = require('chai').assert;
const JwtUtil = require('@utils/jwt');

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

describe.only('JwtProvider util class tests', () => {
    describe('Generate token tests', () => {
        it('토큰은 문자열 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"로 시작한다', () => {
            //given
            const jwtUtil = new JwtUtil(testJwtConfig);
            //when
            const token = jwtUtil.generate(testUser);
            //then
            assert.equal(
                token.startsWith('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'),
                true,
            );
        });
    });

    describe('Verify token tests', () => {
        it('토큰 검증에 성공하면 토큰 정보가 반환된다', () => {
            //given
            const jwtUtil = new JwtUtil(testJwtConfig);
            const token = jwtUtil.generate(testUser);
            //when
            const claims = jwtUtil.verify(token);
            //then
            assert.equal(claims.id, testUser.id);
            assert.equal(claims.username, testUser.name);
            assert.equal(claims.email, testUser.email);
        });

        it('secret이 동일하지 않으면 검증에 실패한다', () => {
            //given
            const jwtUtil = new JwtUtil(testJwtConfig);
            const token = jwtUtil.generate(testUser);

            const otherJwtConfig = { ...testJwtConfig };
            otherJwtConfig.secret = 'other-secret';
            const otherJwtUtil = new JwtUtil(otherJwtConfig);

            //when & then
            assert.throws(() => otherJwtUtil.verify(token));
        });

        it('issuer가 동일하지 않으면 검증에 실패한다', () => {
            //given
            const jwtUtil = new JwtUtil(testJwtConfig);
            const token = jwtUtil.generate(testUser);

            const otherJwtConfig = { ...testJwtConfig };
            otherJwtConfig.issuer = 'other-issuer.com';
            const otherJwtUtil = new JwtUtil(otherJwtConfig);

            //when & then
            assert.throws(() => otherJwtUtil.verify(token));
        });

        it('토큰이 만료되면 검증에 실패한다', () => {
            //given
            const otherJwtConfig = { ...testJwtConfig };
            otherJwtConfig.expiresIn = '10'; //ms
            const jwtUtil = new JwtUtil(otherJwtConfig);
            const token = jwtUtil.generate(testUser);

            //when & then
            assert.throws(() => jwtUtil.verify(token));
        });
    });
});
