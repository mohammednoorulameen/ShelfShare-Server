import { ControllerMethod } from "../common/Controller.methodes";


export interface ICategoryController{
    createCategory : ControllerMethod
    getAllCategories: ControllerMethod
    toggleCategoryStatus: ControllerMethod
    editCategoryData: ControllerMethod
}