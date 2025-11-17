import { inject, injectable } from "tsyringe";
import { BaseRoute } from "../base-routes/base.Routes";
import { IAuthController } from "../../types/controller-interfaces/IAuthController";
// import { IVerificationController } from "../../types/controller-interfaces/IVerificationController";

@injectable()
export class AuthRoutes extends BaseRoute {
  constructor(
    @inject("IAuthController") private _authController: IAuthController,
    // @inject("IVerificatonController")
    // private _verificationController: IVerificationController
  ) {
    super();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this._router.post(
      "/register",
      this._authController.registerUser.bind(this._authController)
    );
  }
}
