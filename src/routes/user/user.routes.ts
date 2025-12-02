import { inject, injectable } from "tsyringe";
import { BaseRoute } from "../base-routes/base.Routes";
import { IUserController } from "../../types/controller-interfaces/IUserController";
// import { authenticate, isUser } from "../../middlewares/auth.middleware";
import { authenticate, isUser } from "../../middlewares/auth.middleware";

@injectable()
export class UserRoutes extends BaseRoute {
  constructor(
    @inject("IUserController") private _userController: IUserController
  ) {
    super();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this._router.put(
      "/update-userinfo", 
       authenticate,isUser,
      this._userController.updateUserInfo.bind(this._userController)
    );
    this._router.put(
      "/update-password", 
       authenticate,isUser,
      this._userController.updateUserPassword.bind(this._userController)
    );
  }
}
