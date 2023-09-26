import { MongoService } from "../mongo/index";
import dbConfig from "../config/mongo";
import { sign, verify } from "jsonwebtoken";
import { envconfig } from "../config/environment";
import { ILoginPayload, IRegisterPayload, IUpdatePasswordPayload, IforgotPasswordPayload } from "../models/AuthModel";
import { DecryptData, EncryptData } from "../utils/CryptrHelper";
import { errorValues, messages, statusCode } from "../config/constants";
import { sendMail } from "../config/NodemailerConfig";
import { WelcomeMailContent } from "../HtmlTemplates/WelcomeMail";
import { ForgotPasswordMail } from "../HtmlTemplates/forgotPasswordMail";
import { decodeJwt } from "../HelperFunction/jwtHelper";
import { ObjectId } from "mongodb";

class AuthService {
  static async getLoginDetails(userName: ILoginPayload["userName"], password: ILoginPayload["password"]) {
    let flag = true;
    return MongoService.collectionDetails(dbConfig.collection.user_profile).then(async (obj) => {
      if (obj.connection)
        return obj.connection
          .findOne({
            $or: [{ email: userName }, { mobileNumber: parseInt(userName) }],
          })
          .then((data: any) => {
            if (!data) {
              flag = false;
            }
            if (data?.password && DecryptData(data.password) !== password) {
              return {
                statusCode: statusCode.unAuthorized,
                data: null,
                auth: flag,
                message: messages.errorMessages.passwordNotCorrect,
              };
            }
            var token;
            if (flag) {
              token =
                (envconfig?.JWT_SECRET &&
                  sign({ id: data?._id }, envconfig?.JWT_SECRET, {
                    expiresIn: dbConfig.expire,
                  })) ||
                "";
              const returnData = {
                statusCode: statusCode.ok,
                auth: flag,
                message: messages.successMessage.login,
                data: {
                  token: token,
                  ...data,
                  password: password,
                },
              };
              return returnData;
            } else {
              return {
                statusCode: statusCode.notFound,
                data: null,
                auth: flag,
                message: messages.errorMessages.notAValidUser,
              };
            }
          })
          .catch((e) => {
            return { ...e, statusCode: statusCode.badRequest, data: null };
          })
          .finally(() => {
            obj.client.close();
          });
    });
  }

  static async postRegisterDetails(RegisterPayload: IRegisterPayload) {
    return MongoService.collectionDetails(dbConfig.collection.user_profile).then(async (obj: any) => {
      if (obj.connection) {
        return obj.connection
          .findOne({
            $or: [{ email: RegisterPayload.email }, { mobileNumber: parseInt(`${RegisterPayload.mobileNumber}`) }],
          })
          .then((data: any) => {
            if (data?._id) {
              return {
                statusCode: statusCode.badRequest,
                data: data._id,
                message: errorValues.errors.ReqistrationUniqueValue,
              };
            } else {
              const encryptedPassward = EncryptData(RegisterPayload.password);
              const newUser = {
                userType: "User",
                password: encryptedPassward,
                name: RegisterPayload.name,
                email: RegisterPayload.email,
                mobileNumber: RegisterPayload.mobileNumber,
              };
              return obj.connection
                ?.insertOne(newUser)
                .then((data: any) => {
                  sendMail({
                    email: RegisterPayload.email,
                    subject: messages.details.welcomeMail,
                    htmlData: WelcomeMailContent(RegisterPayload.name),
                  });
                  return { statusCode: statusCode.created, data: data, message: messages.successMessage.registration };
                })
                .catch((e: any) => {
                  return { ...e, statusCode: statusCode.badRequest, data: null };
                })
                .finally(() => {
                  obj.client.close();
                });
            }
          });
      }
    });
  }

  static async forgotPasswordDetails(forgotPasswordPayload: IforgotPasswordPayload) {
    return MongoService.collectionDetails(dbConfig.collection.user_profile).then(async (obj: any) => {
      if (obj.connection) {
        return obj.connection
          .findOne({
            $or: [
              { email: forgotPasswordPayload.userName },
              { mobileNumber: parseInt(forgotPasswordPayload.userName) },
            ],
          })
          .then((data: any) => {
            if (!data?._id) {
              return { statusCode: statusCode.forbidden, data: null, message: messages.errorMessages.notAValidUser };
            } else {
              const decryptedPassward = DecryptData(data.password);
              sendMail({
                email: data.email,
                subject: messages.details.ForgotPasswordMail,
                htmlData: ForgotPasswordMail({ name: data.name, password: decryptedPassward }),
              });
              return {
                statusCode: statusCode.ok,
                data: forgotPasswordPayload,
                message: messages.successMessage.forgotPassword,
              };
            }
          })
          .catch((e: any) => {
            return { ...e, statusCode: statusCode.badRequest, data: null };
          })
          .finally(() => {
            obj.client.close();
          });
      }
    });
  }

  static async updatePasswordDetails(updatePasswordPayload: IUpdatePasswordPayload, id: string) {
    return MongoService.collectionDetails(dbConfig.collection.user_profile).then(async (obj: any) => {
      if (obj.connection) {
        return obj.connection
          .findOne({
            $or: [
              { email: updatePasswordPayload.userName },
              { mobileNumber: parseInt(updatePasswordPayload.userName) },
            ],
          })
          .then((data: any) => {
            if (!data?._id) {
              return { statusCode: statusCode.notFound, data: null, message: messages.errorMessages.notAValidUser };
            } else {
              const bodyContent = {
                password: EncryptData(updatePasswordPayload.password),
              };
              return obj.connection
                .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: bodyContent }, {})
                .then((data: any) => {
                  return {
                    statusCode: statusCode.ok,
                    data: { ...data.value, password: updatePasswordPayload.password },
                    message: messages.successMessage.updatePassword,
                  };
                })
                .catch((e: any) => {
                  return { ...e, statusCode: statusCode.badRequest, data: null };
                });
            }
          })
          .catch((e: any) => {
            return { ...e, statusCode: statusCode.badRequest, data: null };
          })
          .finally(() => {
            obj.client.close();
          });
      }
    });
  }

  static verifyToken(token: string, successCallback: Function, failiureCallback: Function) {
    try {
      if (envconfig?.JWT_SECRET)
        verify(token, envconfig?.JWT_SECRET, function (err) {
          if (err) {
            failiureCallback(err.name);
          } else {
            successCallback();
          }
        });
    } catch (e) {
      failiureCallback();
    }
  }
}

export default AuthService;
