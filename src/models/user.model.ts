import { Data } from 'ejs';
import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    firstname: String,
	lastname: String,
    username: String,
    password: String,
	address: String,
	email: String,
	phoneNumber: String,
	profilePic: String,
	verifyEmail: Number,
	favourite: [],
	inventories: [],
	requestInbox: [],
	userContacts: [
		{
			userIdContact: String,
			userNameContact: String,
		}
	]
});

export interface userContactdata {
	userIdContact : string;
	userNameContact: string;
}

export interface User {
    _id: string;
    firstname: string;
	lastname: string;
    username: string;
    password: string;
	address: string;
	email: string;
	phoneNumber: string;
	profilePic: string;
	verifyEmail: number;
	favourite: string[],
	inventories: string[];
	requestInbox: string[];
	userContacts: userContactdata[];
}