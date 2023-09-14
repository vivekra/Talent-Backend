export interface IEnvConfigModel {
  MONGO_URI: string | undefined;
  PORT: number | undefined;
  JWT_SECRET: string | undefined;
  SMS_API_KEY: string | undefined;
}

export interface IEnvModel {
  NODE_ENV: string;
}
