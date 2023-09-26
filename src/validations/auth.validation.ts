import Joi from "joi";

const loginPayload = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const updatePasswordPayload = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .options({ messages: { "any.only": "{{#label}} does not match" } }),
  }),
};

const forgotPasswordPayload = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
  }),
};

const registerPayload = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    mobileNumber: Joi.number().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .options({ messages: { "any.only": "{{#label}} does not match" } }),
  }),
};

const authValidation = {
  loginPayload,
  registerPayload,
  forgotPasswordPayload,
  updatePasswordPayload,
};

export default authValidation;
