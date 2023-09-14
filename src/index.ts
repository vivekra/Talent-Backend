import dotenv from "dotenv";
import { env, envconfig } from "./config/environment";
import app from "./app";

dotenv.config({ path: `.env.${env.NODE_ENV}` });

app.listen(envconfig?.PORT, () => {
  console.log("Server is running on port", envconfig?.PORT);
});
