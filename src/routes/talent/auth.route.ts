import express from "express";
import { AuthController } from "../../controller/AuthController";
import validate from "../../middlewares/validate";
import authValidation from "../../validations/auth.validation";
import { routePaths } from "../../config/constants";
import verify from "../../middlewares/verifyToken";

const route = express.Router();

route.post(routePaths.endpoints.auth.login, validate(authValidation.loginPayload), (request, response) => {
  AuthController.getLoginDetails(request, response);
});

route.post(
  routePaths.endpoints.auth.forgotpassword,
  validate(authValidation.forgotPasswordPayload),
  (request, response) => {
    AuthController.forgotPasswordDetails(request, response);
  },
);

route.post(
  routePaths.endpoints.auth.updatepassword,
  verify,
  validate(authValidation.updatePasswordPayload),
  (request, response) => {
    AuthController.updatePasswordDetails(request, response);
  },
);

route.post(routePaths.endpoints.auth.register, validate(authValidation.registerPayload), (request, response) => {
  AuthController.postRegisterDetails(request, response);
});

export default route;
