import { Status } from "../../../shared/constant/status";

export interface CategoryRequestDto {
  name: string;
  description: string;
  status?: Status; 
}