# Node.js REST server boilerplate

-   express

-   MySQL 5.7

-   Sequelize ORM

-   JsonWebToken

-   Passport

<br>

## 실행

### 환경변수 설정

`.env-template` 파일을 복사하여 `.env` 파일을 생성하고 값 설정

```
cp .env-template .env
```

### 라이브러리 설치

```
npm install
```

### 실행

```
//개발 모드로 실행
npm run dev

//유닛 테스트 실행
npm run test:unit

//API 테스트 실행
npm run test:api
```

<br>

## Packages

-   dotenv : `.env` 파일을 이용한 환경변수 설정

-   module-alias : 모듈을 import 할때 상대 경로를 특정 문자열로 매핑하여 사용

    -   모듈의 경로가 변경되었을 때 변경점을 줄일 수 있다.

-   mysql2

-   sequelize : ORM

-   cors : cors 설정 미들웨어

-   jsonwebtoken : JWT 발급 / 검증 라이브러리

-   passport, passport-local, passport-jwt : 인증 처리 미들웨어

-   nodemon : 개발시 코드 변경을 감지하여 서버를 재실행 해주는 라이브러리

-   Test 관련

    -   mocha

    -   chai

    -   supertest : API 호출 테스트
