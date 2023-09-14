import { MongoService } from "../mongo/index";
import dbConfig from "../config/mongo";
import { sign, verify } from "jsonwebtoken";
import { env, envconfig } from "../config/environment";
import dotenv from "dotenv";
import { ILoginPayload, IRegisterPayload } from "../models/AuthModel";
import { DecryptData, EncryptData } from "../utils/CryptrHelper";
import { errorValues, messages } from "../config/constants";
dotenv.config({ path: `.env.${env.NODE_ENV}` });

class AuthService {
  static async getLoginDetails(userName: ILoginPayload["userName"], password: ILoginPayload["password"]) {
    let flag = true;
    return MongoService.collectionDetails(dbConfig.collection.user_profile).then(async (obj) => {
      if (obj.connection)
        return obj.connection
          .findOne({
            $or: [{ email: userName }, { mobileNumber: parseInt(userName) }],
          })
          .then((data) => {
            if (!data) {
              flag = false;
            }
            if (data?.password && DecryptData(data.password) !== password) {
              return {
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
                    expiresIn: dbConfig.expire, // expires in 7 days hours
                  })) ||
                "";
            }
            if (flag) {
              const returnData = {
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
                data: null,
                auth: flag,
                message: messages.errorMessages.notAValidUser,
              };
            }
          })
          .catch(() => {
            return { message: messages.errorMessages.notAValidUser };
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
            $or: [{ email: RegisterPayload.name }, { mobileNumber: parseInt(`${RegisterPayload.mobileNumber}`) }],
          })
          .then((data: any) => {
            if (data?._id) {
              return { data: data._id, message: errorValues.errors.ReqistrationUniqueValue };
            } else {
              const encryptedPassward = EncryptData(RegisterPayload.password);
              const newUser = {
                password: encryptedPassward,
                name: RegisterPayload.name,
                email: RegisterPayload.email,
                mobileNumber: RegisterPayload.mobileNumber,
              };
              return obj.connection
                ?.insertOne(newUser)
                .then((data: any) => {
                  return { data: data, message: messages.successMessage.registration };
                })
                .catch((e: any) => {
                  return { data: null, message: e.message };
                })
                .finally(() => {
                  obj.client.close();
                });
            }
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
