import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../../../model/User";

export default {
 Mutation: {
  getUser: async (_, args) => {
   const { name, password } = args;
   try {
    const result = await User.findOne({ name, password });
    console.log(result);
    if (result) {
     const token = jwt.sign({ result }, process.env.SECRETCODE, {
      expiresIn: "7d",
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
 },
 Query: {
  getCookie: async (_, args) => {
   const { cookieToken } = args;
   try {
    const token = jwt.verify(cookieToken, process.env.SECRETCODE);
    console.log(token);
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
