import jwt from "jsonwebtoken";
require("dotenv").config();

export const jwtsign = (name, password) => {
 const token = jwt.sign({ name, password }, process.env.PRIVATE_KEY, {
  expiresIn: "5h",
 });
 return token;
};
