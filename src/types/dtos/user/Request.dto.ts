export interface UserRequestDto{
    email : string;
    userName: string;
    phoneNumber : string;
    password : string;
    referralCode? : string;
    imageKey?: string;
}