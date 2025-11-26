import { inject, injectable } from "tsyringe";
import { BaseRoute } from "../base-routes/base.Routes";
import { IAdminController } from "../../types/controller-interfaces/IAdminController";

@injectable()
export class AdminRoutes extends BaseRoute {
  constructor(
    @inject("IAdminController") private _adminController: IAdminController
  ) {
    super();
    this.initializeRoutes();
  }
  initializeRoutes(): void {

    this._router.get(
      "/allvendors",
      this._adminController.getAllVendors.bind(this._adminController)
    );

    this._router.patch(
      "/vendors/:vendorId/toggle-verify",
      this._adminController.toggleAdminVerification.bind(this._adminController)
    );

    this._router.patch(
      "/vendors/:vendorId/toggle-block",
      this._adminController.toggleAdminBlockVendor.bind(this._adminController)
    );

    this._router.get(
      "/allusers",
      this._adminController.getAllUsers.bind(this._adminController)
    );

    this._router.patch(
      "/user/:userId/toggled-block",
      this._adminController.toggleAdminBlockUser.bind(this._adminController)
    );
    
  }
}
