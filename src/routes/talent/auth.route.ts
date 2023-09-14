import express from "express";
import { AuthController } from "../../controller/AuthController";
import validate from "../../middlewares/validate";
import authValidation from "../../validations/auth.validation";
import { routePaths } from "../../config/constants";

const route = express.Router();

route.post(routePaths.endpoints.auth.login, validate(authValidation.loginPayload), (request, response) => {
  AuthController.getLoginDetails(request, response);
});

route.post(routePaths.endpoints.auth.register, validate(authValidation.registerPayload), (request, response) => {
  AuthController.postRegisterDetails(request, response);
});

export default route;
