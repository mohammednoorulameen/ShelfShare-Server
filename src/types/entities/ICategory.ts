import { Status } from "../../shared/constant/status";



export interface ICategory{
    _id: string | Object
    categoryId: string; 
    name : string;
    description: string;
    status : Status
    createdAt : Date
}