import { inject, injectable } from "tsyringe";
import { BaseRoute } from "../base-routes/base.Routes";
import { authenticate, isVendor, } from "../../middlewares/auth.middleware";
import { IVendorController } from "../../types/controller-interfaces/IVendorController";

@injectable()
export class VendorRoutes extends BaseRoute {
  constructor(
    @inject("IVendorController") private _vendorController: IVendorController
  ) {
    super();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this._router.get(
      "/vendor-data",
      authenticate, isVendor,
      this._vendorController.getVendor.bind(this._vendorController)
    );
    
    this._router.put(
      "/vendor-reapply",
      authenticate, isVendor,
      this._vendorController.reapplyForVendorVerification.bind(this._vendorController)
    );


  }
}
