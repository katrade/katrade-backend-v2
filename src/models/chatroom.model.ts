import * as mongoose from 'mongoose';

export const chatroomSchema = new mongoose.Schema({
    roomId: String, //เลขห้อง
    messages: [
        {
            sender: String,
            content_type: String,
            content: String,
            timeStamp: Date,
        }
    ],
})

export interface MessageForData {
    roomId: string;
    sender: string;
    content_type: string;
    content: string;
    timeStamp: Date;
}

export interface Message {
    sender: string;
    content_type: string;
    content: string;
    timeStamp: Date;
}

export interface Chatroom {
    roomId: string;
    messages: Message[];
}