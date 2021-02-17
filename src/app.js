import express, { response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import bodyParser from "body-parser";
import schema from "../graphql/schemas";
import connect from "../db/mongo";
import cookieParser from "cookie-parser";

// jwt를 가져옴
// import jwt from "../graphql/api/Jwt/jwt";

const app = express();

app.set(`port`, process.env.PORT);
app.use(morgan(`dev`));
connect();

app.use(cookieParser());

// login 기능 =============================================================

// 프론트의 데이터를 가져올수 없어 임의로 값을 넣어줌
// const name = "ㅎㅇ";
// const password = "123";

// 결과 값을 담을 변수 생성
// let login;
// let userData;

// then안에는 무조건 매개변수로 만들어서 넣어준다
// import로 리졸버에 작성된 mutation을 가져와 값을 넣어주고 결과값을 login과 userData에 넣어줌
// const a = jwt.Mutation.getUser2(name, password).then((result) => {
//  (login = result.isLogin), (userData = result.login_user);

//  if (login) {
//   app.use("/", (req, res, next) => {
//  쿠키 생성
//    res.cookie("login", userData, { httpOnly: true });
//    next();
//   });
//  }
// });
// ========================================================================

app.use(
 `/graphql`,
 cors(),
 bodyParser.json(),
 graphqlHTTP({
  schema,
  graphiql: true,
 })
);

app.listen(app.get(`port`), () => {
 console.log(
  `[NOTICE SERVER START] :: ${process.env.PORT}, WTH GraphQL - MongoDB`
 );
});
