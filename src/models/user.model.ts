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
	followers: [],
	following: [],
	inventories: []
});

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
	followers: string[];
	following: string[];
	inventories: string[];
}