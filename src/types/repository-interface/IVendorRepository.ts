import { IVendor } from "../entities/IVendor";
import { IBaseRepository } from "./IBaseRepository";



export interface IVendorRepository extends IBaseRepository<IVendor>{
    findByEmail(email:string): Promise <IVendor | null>
}