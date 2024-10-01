import { sign, verify } from "jsonwebtoken";
import * as jose from "jose";

const secretKey = process.env.JWT_SECRET;

export const signToken = (payload) => {
  const token = sign(payload, secretKey);
  return token;
};

export const verifyToken = (token) => {
  return verify(token, secretKey);
};

export const verifyWithJose = async (token) => {
  // console.log("tokenjose: ", token);
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  // console.log("process.env.SECRET: ", process.env.JWT_SECRET);
  // console.log("secret: ", secret);

  const { payload } = await jose.jwtVerify(token, secret);
  // console.log("payload: ", payload);
  return payload;
};
