import { IVendor } from "../entities/IVendor";
import { IBaseRepository } from "./IBaseRepository";



export interface IVendorRepository extends IBaseRepository<IVendor>{
    findByEmail(email:string): Promise <IVendor | null>
     updateOne(id:string, update: Partial<IVendor>): Promise <IVendor| null>
    //  updateById(id: string, data: Partial<IVendor>): Promise<IVendor | null>;
}