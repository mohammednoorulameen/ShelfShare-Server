import express, { Application } from "express";
import { config } from "./config";
import { corsOption } from "./middlewares/cors.middleware";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorHandlingMiddleWare } from "./middlewares/error.handling.middleware";
import { container } from "tsyringe";
import { AuthRoutes } from "./routes/auth/auth.routes";
import { DependencyInjection } from "./di";
import { registerUserEventListner, registerVendorEventListner } from "./events/listeners/auth.listeners";
import { AdminRoutes } from "./routes/admin/admin.routes";
import {  UserRoutes } from "./routes/user/user.routes";
import { VendorRoutes } from "./routes/vendor/vendor.routes";
import morgan from "morgan";
import { logger } from "./shared/utils/logger";
import { httpLogger } from "./middlewares/logger.middleware";

export default class Server {
  private _app: Application;
  private _port: number;

  constructor() {
    this._app = express();
    this._port = config.server.PORT;
    this.initialize();
  }

  private initialize() {
    DependencyInjection.registerAll();
      registerUserEventListner()
      registerVendorEventListner()
    this.configureMiddleWares();
    this.configureRoutes();
    this.configureHandlingMiddlewares();
  }

  private configureMiddleWares(): void {
    this._app.use(httpLogger); 
    this._app.use(cors(corsOption));
    this._app.use(express.json());
    this._app.use(cookieParser());
    this._app.use(morgan("dev"));
    this._app.use(express.urlencoded({ extended: true }));

  }

  private configureHandlingMiddlewares() {
    const ErrorHandlingMiddleWareInstance = container.resolve(
      ErrorHandlingMiddleWare
    );
    this._app.use(
      ErrorHandlingMiddleWareInstance.handleError.bind(
        ErrorHandlingMiddleWareInstance
      )
    );
  }

  private configureRoutes(): void {
    const authRoutes = container.resolve(AuthRoutes);
    const adminRoutes = container.resolve(AdminRoutes);
    const userRoutes = container.resolve(UserRoutes);
    const venorRoutes = container.resolve(VendorRoutes);
    this._app.use("/api/auth/", authRoutes.router);
    this._app.use("/api/admin/", adminRoutes.router);
    this._app.use("/api/user/", userRoutes.router);
    this._app.use("/api/vendor/", venorRoutes.router);
  }

  public start(): void {
    this._app.listen(this._port, () => {
      logger.info(`server is runnning port ${this._port} `);
    });
  }
}
