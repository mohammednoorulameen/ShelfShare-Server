import { userDto } from "./createUser.dto";
import { VendorDto } from "./createVendor.dto";

export type RegisterDto = userDto | VendorDto;
