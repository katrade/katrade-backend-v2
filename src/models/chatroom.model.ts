import * as mongoose from 'mongoose';

export const chatroomSchema = new mongoose.Schema({
    roomId: String, //เลขห้อง
    user1: String,
    user2: String,
    messages: [{
        Message: {
            sender: String,
            type: String,
            content: String,
            timeStamp: Date,
        }
    }],
})

export interface Message {
    sender: string;
    type: string;
    content: string;
    timeStamp: Date;
}

export interface Chatroom {
    roomId: string;
    user1: string;
    user2: string;
    messages: Message[];
}