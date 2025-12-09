import { ObjectId, Types } from "mongoose";
import { Status } from "../../../shared/constant/status";

export interface ProductResponseDto {
  _id: string | ObjectId ;
  productId: string;
  // vendorId: Types.ObjectId;
  vendorId: string;
  productName: string;
  actualPrice: number;
  rentPrice: number;
  stock: number;
  // category: Types.ObjectId;
  category: string;
  description: string;
  publisher: string;
  author: string;
  language: string;
  rentDate: Date;
  duration: string;
  imageKey: string[];
  status: Status;
  rating: { count: number; average: number };
  createdAt: Date;
  updatedAt: Date;
}
