import { inject, injectable } from "tsyringe";
import { BaseRoute } from "../base-routes/base.Routes";
import { IAdminController } from "../../types/controller-interfaces/IAdminController";
import { ICategoryController } from "../../types/controller-interfaces/ICategoryController";
import { authenticate, isAdmin } from "../../middlewares/auth.middleware";

@injectable()
export class AdminRoutes extends BaseRoute {
  constructor(
    @inject("IAdminController") private _adminController: IAdminController,
    @inject("ICategoryController")
    private _categoryController: ICategoryController
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

    this._router.post(
      "/category/create-category",
      authenticate,isAdmin,
      this._categoryController.createCategory.bind(this._categoryController)
    );
    this._router.get(
      "/category/get-category", 
      authenticate,isAdmin,
      this._categoryController.getAllCategories.bind(this._categoryController)
    );
    this._router.patch(
     "/category/toggle-status/:categoryId", 
      authenticate,isAdmin,
      this._categoryController.toggleCategoryStatus.bind(this._categoryController)
    );
  }
}
