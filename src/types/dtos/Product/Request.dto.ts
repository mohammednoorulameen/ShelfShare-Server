import { Status } from "../../../shared/constant/status";
import { IProduct } from "../../entities/IProduct";

export interface ProductRequestDto {
  productName: string;
  vendorId : string,
  actualPrice: number;
  rentPrice: number;
  stock: number;
  category: string;
  description: string;
  publisher: string;
  author: string;
  language: string;
  rentDate: string;
  duration: string;
  imageKey: string[];
  status: Status;
}
