import { inject, injectable } from "tsyringe";
import { BaseRoute } from "../base-routes/base.Routes";
import { IAuthController } from "../../types/controller-interfaces/IAuthController";
import { IVerificationController } from "../../types/controller-interfaces/IVerificationController";
import { authenticate } from "../../middlewares/auth.middleware";

@injectable()
export class AuthRoutes extends BaseRoute {
  constructor(
    @inject("IAuthController") private _authController: IAuthController,
    @inject("IVerificationController")
    private _verificationController: IVerificationController
  ) {
    super();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this._router.post(
      "/register",
      this._authController.registerUserVendor.bind(this._authController)
    );

    this._router.get(
      "/verifyemail",
      this._verificationController.verifyBothEmail.bind(
        this._verificationController
      )
    );

    this._router.post(
      "/login",
      this._authController.loginBoth.bind(this._authController)
    );

    this._router.post(
      "/refresh",
      this._authController.refreshAccessToken.bind(this._authController)
    );

    this._router.post(
      "/logout",
      authenticate,
      this._authController.logout.bind(this._authController)
    );

    this._router.post(
      "/forgot-password",
      this._verificationController.verifyForgotPassword.bind(
        this._verificationController
      )
    );

    this._router.get(
      "/forgot-password/verify",
      this._verificationController.verifyForgotToken.bind(
        this._verificationController
      )
    );
    this._router.post(
      "/reset-password",
      this._verificationController.resetPassword.bind(
        this._verificationController
      )
    );
    this._router.post(
      "/google",
      this._authController.googleLogin.bind(this._authController)
    );
  }
}
