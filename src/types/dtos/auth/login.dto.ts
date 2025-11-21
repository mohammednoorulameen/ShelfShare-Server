export interface LoginDto {
  email: string;
  password: string;
  role: "user" | "vendor" | "admin";
}
