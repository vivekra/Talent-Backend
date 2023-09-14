import { Request } from "express";
import { verify } from "jsonwebtoken";
import { env, envconfig } from "../config/environment";
import dotenv from "dotenv";
dotenv.config({ path: `.env.${env.NODE_ENV}` });

export const decodeJwt = (request: Request) => {
  const token = request.headers.authorization?.split("Bearer ")[1];
  let data: any = {};
  if (token) {
    data = envconfig?.JWT_SECRET && verify(token, envconfig?.JWT_SECRET);
  }
  return data;
};
