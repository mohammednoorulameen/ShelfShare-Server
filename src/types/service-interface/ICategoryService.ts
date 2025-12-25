import { CreateCategoryDto } from "../dtos/category/ CreateCategory.dto";
import { ICategory } from "../entities/ICategory";



export interface ICategoryServices{
     createCategory(dto: CreateCategoryDto): Promise<ICategory | null>;
     getAllCategories(
         page?: number,
         limit?: number
       ): Promise<{
         data: ICategory[];
         total: number;
         page: number;
         limit: number;
         totalPages: number;
       }>;
    toggleCategoryStatus(categoryId:string): Promise <ICategory>
    editCategoryData(categoryId: string, data:{name : string, description: string}): Promise <any>
}