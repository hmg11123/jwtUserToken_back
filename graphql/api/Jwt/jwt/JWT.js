import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../../../model/User";
import express from "express";
import cookieParser from "cookie-parser";

export default {
 Mutation: {
  getUser: async (_, args) => {
   const { name, password } = args;
   try {
    const result = await User.findOne({ name, password });
    if (result) {
     const app = express();
     app.use(cookieParser());
     const token = jwt.sign({ result }, process.env.SECRETCODE, {
      expiresIn: "7d",
     });
     const a = app.use("/", (req, res, next) => {
      res.cookie("login", token, { httpOnly: false });
      next();
     });
     return {
      isLogin: true,
      login_user: token,
     };
    } else {
     return {
      isLogin: false,
      login_user: "",
     };
    }
   } catch (e) {
    console.log(e);
    return {};
   }
  },
  //   getUser2: async (_, args) => {
  //    const { name, password } = args;
  //    try {
  //     const result = await User.findOne(name, password);
  //     // console.log(response.cookie("login", "ddd", { httpOnly: true }));
  //     if (result) {
  //      const token = jwt.sign({ result }, process.env.SECRETCODE, {
  //       expiresIn: "7d",
  //      });

  //      return {
  //       isLogin: true,
  //       login_user: token,
  //       //   cookie: cookieContainer,
  //      };
  //     } else {
  //      return {
  //       isLogin: false,
  //       login_user: "",
  //      };
  //     }
  //    } catch (e) {
  //     console.log(e);
  //     return {};
  //    }
  //   },
 },
 Query: {
  getCookie: async (_, args) => {
   const { cookieToken } = args;
   try {
    const token = jwt.verify(cookieToken, process.env.SECRETCODE);
    return {
     _id: token.result._id,
     name: token.result.name,
     password: token.result.password,
    };
   } catch (e) {
    console.log(e);
    return {};
   }
  },
 },
};
