import { config } from "../config";


export const corsOption = {
    origin : config.cors.ALLOWED_ORIGIN,
    method : ["POST","GET","DELETE", "PUT", 'PATCH', "OPTIONS"],
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type']
}