import "reflect-metadata";
import { connectDB } from "./config/db";
import Server from "./server";



const server = new Server();
const mongo = new connectDB();
mongo.connect()
server.start()