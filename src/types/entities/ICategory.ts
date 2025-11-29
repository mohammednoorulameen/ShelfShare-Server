import { Status } from "../../shared/constant/status";



export interface ICategory{
    _id: string | Object
    name : string;
    discription: string;
    status : Status
    createdAt : Date
}