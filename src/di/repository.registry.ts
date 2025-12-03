import { container } from "tsyringe";
import { IUserRepository } from "../types/repository-interface/IUserRepository";
import { UserRepository } from "../repositories/user.repository";
import { IVendorRepository } from "../types/repository-interface/IVendorRepository";
import { VendorRepository } from "../repositories/vendor.repository";
import { IAdminRepository } from "../types/repository-interface/IAdminRepository";
import { AdminRepository } from "../repositories/admin.repository";
import { ICategoryRepository } from "../types/repository-interface/ICategoryRepository";
import { CategoryRepository } from "../repositories/category.repository";

/**
 * register all repositories
 */

export class RepositoryRegistry {
  static registerRepositories(): void {
    // user repositry
    container.register<IUserRepository>("IUserRepository", {
      useClass: UserRepository,
    }),
    // vendor repository
      container.register<IVendorRepository>("IVendorRepository", {
        useClass: VendorRepository,
      });
      container.register<IUserRepository>("IUserRepository",{
        useClass : UserRepository
      });
      container.register<IAdminRepository>("IAdminRepository",{
        useClass : AdminRepository
      })
      container.register<ICategoryRepository>("ICategoryRepository",{
        useClass : CategoryRepository
      })
  }
}
