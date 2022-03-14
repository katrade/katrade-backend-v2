import * as mongoose from 'mongoose';

export const contactlistSchema = new mongoose.Schema({
  userId: String,
  userContacts: [],
});

export interface Contactuser {
  userId: string;
  userContacts: string;
}

export interface Contactlist {
  userId: string;
  userContacts: string[];
}
