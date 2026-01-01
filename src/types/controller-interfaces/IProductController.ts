import { ControllerMethod } from "../common/Controller.methodes";


export interface IProductController{
    createNewProduct : ControllerMethod
    getVendorProducts : ControllerMethod
    updateProduct : ControllerMethod
    getUpdateDataWithId: ControllerMethod
    getAllProduct : ControllerMethod
}