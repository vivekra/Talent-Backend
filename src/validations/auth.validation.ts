import Joi from "joi";

const loginPayload = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const registerPayload = {
  body: Joi.object().keys({
    name: Joi.number().required(),
    email: Joi.string().required(),
    mobileNumber: Joi.number().required(),
    password: Joi.string().required(),
    confirmpassword: Joi.string()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .options({ messages: { "any.only": "{{#label}} does not match" } }),
  }),
};

const authValidation = {
  loginPayload,
  registerPayload,
};

export default authValidation;
