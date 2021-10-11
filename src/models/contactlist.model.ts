import * as mongoose from 'mongoose';

export const contactlistSchema = new mongoose.Schema ({
    userId : String,
    contactusers : []
})

export interface Contactuser {
    userId : string;
    contactuser : string;
}

export interface Contactlist {
    userId : string;
    contactusers : string[];
}