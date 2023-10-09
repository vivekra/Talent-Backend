export const routePaths = {
  baseURL: "/talent/api",
  endpoints: {
    auth: {
      login: "/login",
      activate: "/activate/:id",
      forgotpassword: "/forgotpassword",
      updatepassword: "/updatepassword",
      auth: "/auth",
      register: "/register",
    },
  },
};

export const errorValues = {
  errors: {
    ReqistrationUniqueValue: "Registration details must be unique (email or mobileNumber is used already)",
  },
};

export const messages = {
  successMessage: {
    registration: "User registered successfully. Activation link sended to your mail",
    login: "Logged in successfully",
    forgotPassword: "Your Password Send To Your Mail",
    updatePassword: "Your Password Is Changed Successfully",
    accountActivation: "Your Digital-Q Account Is Activated Successfully",
  },
  errorMessages: {
    passwordNotCorrect: "Password you have enterded is in correct",
    notAValidUser: "User Details you have entered is not valid",
    notAActiveUser: "User details not active. Please activate your Account.",
  },
  details: {
    welcomeMail: "Welcome To Digital - Q Talent Site",
    ActivationMail: "Account Activation Digital - Q Talent Site",
    ForgotPasswordMail: "Your Digital - Q Talent Account Password ",
  },
};

export const statusCode = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unAuthorized: 401,
  forbidden: 403,
  notFound: 404,
  serverError: 500,
  serviceUnavailable: 503,
  serviceTimeout: 504,
};
