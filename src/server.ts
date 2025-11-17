import express, { Application } from "express";
import { config } from "./config";
import { corsOption } from "./middlewares/cors.middleware";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorHandlingMiddleWare } from "./middlewares/error.handling.middleware";
import { container } from "tsyringe";
import { AuthRoutes } from "./routes/auth/auth.routes";
import { DependencyInjection } from "./di";

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
    //   registerUserEventListner()
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
    this._app.use("/api/auth/", authRoutes.router);
  }

  public start(): void {
    this._app.listen(this._port, () => {
      console.log(`server is runnning port ${this._port} `);
    });
  }
}
