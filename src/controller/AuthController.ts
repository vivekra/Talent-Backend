import { Request, Response } from "express";
import AuthService from "../service/AuthService";
import { ErrorHandle } from "../middlewares/error";
import { ILoginPayload, IRegisterPayload } from "../models/AuthModel";
import { messages } from "../config/constants";
import { InsertOneResult } from "mongodb";

export class AuthController {
  static getLoginDetails(request: Request, response: Response) {
    const bodyContent: ILoginPayload = request.body;
    AuthService.getLoginDetails(bodyContent.userName, bodyContent.password)
      .then((data: any) => {
        response.status(200).json({ data: data?.data, message: data?.message });
      })
      .catch((e) => {
        ErrorHandle.writeLog("Exception in AuthController", e.message);
        response.status(500).send(e.message);
      });
  }

  static postRegisterDetails(request: Request, response: Response) {
    const bodyContent: IRegisterPayload = request.body;
    AuthService.postRegisterDetails(bodyContent)
      .then((data: any) => {
        response.status(200).json({ data: data?.data, message: data?.message });
      })
      .catch((e) => {
        ErrorHandle.writeLog("Exception in AuthController", e.message);
        response.status(500).send(e.message);
      });
  }

  static verifyAuthentication(token: string, successCallback: Function, failiureCallback: Function) {
    try {
      AuthService.verifyToken(token, successCallback, failiureCallback);
    } catch (e: any) {
      throw new Error("Failed to authenticate token. " + e.message);
    }
  }
}
