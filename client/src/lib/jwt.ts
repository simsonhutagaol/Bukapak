import jwt from "jsonwebtoken";

import * as jose from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "tidak aman";

export const createToken = (payload: object) => jwt.sign(payload, SECRET_KEY);

export const readPayload = (token: string) => jwt.verify(token, SECRET_KEY);

export const readPayloadJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(SECRET_KEY);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);

  return payloadJose.payload;
};
