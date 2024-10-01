import { sign, verify } from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

export const signToken = (payload) => {
  const token = sign(payload, secretKey);
  return token;
};

export const verifyToken = (token) => {
  return verify(token, secretKey);
};
