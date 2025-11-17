import mongoose from 'mongoose'
import { config } from './index'

export class connectDB{
    private _dburi : string
    constructor(){
        this._dburi = config.database.URI
    }


    async connect(){
        try {
            await mongoose.connect(this._dburi);
            console.log("Mongodb Connect Successfully")
        } catch (error) {
            console.log(error)
            throw new Error("Database Connection Field")
        }
    }

}