export const routePaths = {
  baseURL: "/talent/api",
  endpoints: {
    auth: {
      login: "/login",
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
  },
  errorMessages: {
    passwordNotCorrect: "Password you have enterded is in correct",
    notAValidUser: "User Details you have entered is not valid",
  },
};
