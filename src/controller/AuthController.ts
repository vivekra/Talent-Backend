import { Request, Response } from "express";
import AuthService from "../service/AuthService";
import { ErrorHandle } from "../middlewares/error";
import { ILoginPayload, IRegisterPayload, IUpdatePasswordPayload, IforgotPasswordPayload } from "../models/AuthModel";
import { decodeJwt } from "../HelperFunction/jwtHelper";

export class AuthController {
  static getLoginDetails(request: Request, response: Response) {
    const bodyContent: ILoginPayload = request.body;
    AuthService.getLoginDetails(bodyContent.userName, bodyContent.password)
      .then(({ statusCode, ...data }: any) => {
        response.status(statusCode).json(data);
      })
      .catch((e) => {
        ErrorHandle.writeLog("Exception in AuthController", e.message);
        response.status(500).send({ data: null, ...e });
      });
  }

  static forgotPasswordDetails(request: Request, response: Response) {
    const bodyContent: IforgotPasswordPayload = request.body;
    AuthService.forgotPasswordDetails(bodyContent)
      .then(({ statusCode, ...data }: any) => {
        response.status(statusCode).json(data);
      })
      .catch((e) => {
        ErrorHandle.writeLog("Exception in AuthController", e.message);
        response.status(500).send({ data: null, ...e });
      });
  }

  static updatePasswordDetails(request: Request, response: Response) {
    const bodyContent: IUpdatePasswordPayload = request.body;
    const decodedJWT = decodeJwt(request);
    AuthService.updatePasswordDetails(bodyContent, decodedJWT.id)
      .then(({ statusCode, ...data }: any) => {
        response.status(statusCode).json(data);
      })
      .catch((e) => {
        ErrorHandle.writeLog("Exception in AuthController", e.message);
        response.status(500).send({ data: null, ...e });
      });
  }

  static postRegisterDetails(request: Request, response: Response) {
    const bodyContent: IRegisterPayload = request.body;
    AuthService.postRegisterDetails(bodyContent)
      .then(({ statusCode, ...data }: any) => {
        response.status(statusCode).json(data);
      })
      .catch((e) => {
        ErrorHandle.writeLog("Exception in AuthController", e.message);
        response.status(500).send({ data: null, ...e });
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
