import ServerlessHttp from "serverless-http"
import app from "../src/app"

export default ServerlessHttp(app);