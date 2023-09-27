import { envconfig } from "./config/environment";
import app from "./app";

app.listen(envconfig?.PORT, () => {
  console.log("Server is running on port", envconfig?.PORT);
});
