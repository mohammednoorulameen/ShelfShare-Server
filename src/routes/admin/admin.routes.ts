import { inject, injectable } from "tsyringe";
import { BaseRoute } from "../base-routes/base.Routes";
import { IAdminController } from "../../types/controller-interfaces/IAdminController";

@injectable()
export class AdminRoutes extends BaseRoute {
  constructor(
    @inject("IAdminController") private _adminController: IAdminController,
  ) {
    super();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this._router.get(
      "/allvendors",
      this._adminController.getAllVendors.bind(this._adminController)
    );

    
}
}