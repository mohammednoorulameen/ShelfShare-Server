// src/core/types/repository.interface/IBaseRepository.ts
import { FilterQuery } from "mongoose";

export interface IBaseRepository<T> {
  findOne(query: FilterQuery<T>): Promise<T | null>;

  create(data: Partial<T>): Promise<T>;
  update(query: any, data: any): Promise<T | null>;
 

}
