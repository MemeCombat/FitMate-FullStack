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
  const secret = new TextEncoder().encode(process.env.SECRET);

  const { payload } = await jose.jwtVerify(token, secret);
  return payload;
};
