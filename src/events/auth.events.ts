import { EventEmitter } from "stream";


export const authEvents = new EventEmitter();

export enum AuthEvents{
    UserRegistered = "UserRegistered"
}