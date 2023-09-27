import express from "express";
import helmet from "helmet";
import cors from "cors";
import httpStatus from "http-status";
import { ErrorHandle } from "./middlewares/error";
import ApiError from "./utils/ApiError";
import routes from "./routes/talent/index";
import path from "path";
import dbConfig from "./config/mongo";
import { routePaths } from "./config/constants";

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

// talent api routes
app.use(routePaths.baseURL, routes);
app.use("/", (req, res) => {
  res.json("Server running...")
})

// token check

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, dbConfig.message.notExist));
});

// convert error to ApiError, if needed
app.use(ErrorHandle.errorConverter);

// handle error
app.use(ErrorHandle.errorHandler);

export default app;
