import { ICategory } from "../entities/ICategory";
import { IBaseRepository } from "./IBaseRepository";


export interface ICategoryRepository extends IBaseRepository <ICategory>{
    findByName(name: string): Promise<ICategory | null>   
    findById(categoryId: string) : Promise<ICategory | null>
}