import { inject, injectable } from "tsyringe";
import { BaseRoute } from "../base-routes/base.Routes";
import { authenticate, isVendor, } from "../../middlewares/auth.middleware";
import { IVendorController } from "../../types/controller-interfaces/IVendorController";
import { IProductController } from "../../types/controller-interfaces/IProductController";
import { ICategoryController } from "../../types/controller-interfaces/ICategoryController";

@injectable()
export class VendorRoutes extends BaseRoute {
  constructor(
    @inject("IVendorController") private _vendorController: IVendorController,
    @inject("IProductController") private _productController: IProductController,
    @inject("ICategoryController")private _categoryController: ICategoryController
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

    this._router.post(
      "/vendor-addproduct",
      authenticate, isVendor,
      this._productController.createNewProduct.bind(this._productController)
    );

    this._router.get(
         "/category/get-category",
         authenticate,isVendor,
         this._categoryController.getAllCategories.bind(this._categoryController)
       );
    this._router.get(
         "/get-vendorproduct",
         authenticate,isVendor,
         this._productController.getVendorProducts.bind(this._productController)
       );
    this._router.put(
         "/update-product/:productId",
         authenticate,isVendor,
         this._productController.updateProduct.bind(this._productController)
       );
  }
}
