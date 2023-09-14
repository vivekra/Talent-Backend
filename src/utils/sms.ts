import { envconfig } from "../config/environment";

const getSMSOptions = (otp: any, targetNumber: any) => {
  return {
    authorization: envconfig?.SMS_API_KEY,
    message: `Your OTP is ${otp}`,
    numbers: [targetNumber],
  };
};

export { getSMSOptions };
