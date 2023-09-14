import express from "express";

import authRoute from "./auth.route";
import { routePaths } from "../../config/constants";

const router = express.Router();

const defaultRoutes = [
  {
    path: routePaths.endpoints.auth.auth,
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
