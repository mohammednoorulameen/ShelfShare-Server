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
    this._app.use(cors(corsOption));
    this._app.use(express.json());
    this._app.use(cookieParser());
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
    this._app.use("/api/auth/", authRoutes.router);
    this._app.use("/api/admin/", adminRoutes.router);
    this._app.use("/api/user/", userRoutes.router);
  }

  public start(): void {
    this._app.listen(this._port, () => {
      console.log(`server is runnning port ${this._port} `);
    });
  }
}
