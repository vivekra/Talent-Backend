export const routePaths = {
  baseURL: "/talent/api",
  endpoints: {
    auth: {
      login: "/login",
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
    registration: "User registered successfully",
    login: "Logged in successfully",
    forgotPassword: "Your Password Send To Your Mail",
    updatePassword: "Your Password Is Changed Successfully",
  },
  errorMessages: {
    passwordNotCorrect: "Password you have enterded is in correct",
    notAValidUser: "User Details you have entered is not valid",
  },
  details: {
    welcomeMail: "Welcome To Digital - Q Talent Site",
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
