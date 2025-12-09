import { Status } from "../../../shared/constant/status";

export interface CategoryResponseDto {
  _id: string;
  categoryId: string;
  name: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
