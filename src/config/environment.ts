import { DotenvParseOutput, config } from "dotenv";
import { IEnvConfigModel, IEnvModel } from "../models/envModel";

export const env: IEnvModel = {
  NODE_ENV: "development",
};

const configResult = config({ path: `.env` });
if (configResult.error) {
  throw configResult.error;
}
const { parsed } = configResult;
export const envconfig: DotenvParseOutput | undefined | IEnvConfigModel = parsed;
