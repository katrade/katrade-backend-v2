import * as mongoose from 'mongoose';

export const chatroomSchema = new mongoose.Schema({
    roomId: String, //เลขห้อง
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
    messages: Message[];
}