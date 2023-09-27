import ServerlessHttp from "serverless-http"
import app from "../src/main"

export default ServerlessHttp(app);