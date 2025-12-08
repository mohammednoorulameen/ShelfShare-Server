import mongoose from 'mongoose'
import { config } from './index'
import { logger } from '../shared/utils/logger';

export class connectDB{
    private _dburi : string
    constructor(){
        this._dburi = config.database.URI
    }


    async connect(){
        try {
            await mongoose.connect(this._dburi);
            logger.info("Mongodb Connect Successfully")
        } catch (error) {
            logger.error(error)
            throw new Error("Database Connection Field")
        }
    }

}