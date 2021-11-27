import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chatroom, Message, MessageForData } from "src/models/chatroom.model";

@Injectable() 
export class ChatroomService {
    constructor(
        @InjectModel('Chatroom') private readonly chatroomModel: Model<Chatroom>,
    ){}

    async getroom(roomid: string){
        let chatroom = await this.chatroomModel.findOne({roomId: roomid});
        return chatroom;
    }

    async newroom(roomid: string){
        let newRoom = new this.chatroomModel({
            roomId: roomid,
            messages: []
        })
        let checkroom = await this.chatroomModel.findOne({roomId: roomid});
        if (!checkroom) {
            await this.chatroomModel.create(newRoom).then(() => {
                console.log('Create Newroom Success');
            })
        }
    }

    async addMessage(body: MessageForData){
        console.log(body)
        let message : Message = {sender: body.sender, content_type: body.content_type, content: body.content, timeStamp: body.timeStamp}
        let checkroom = await this.chatroomModel.findOne({roomId: body.roomId});
        if (checkroom) {
            await this.chatroomModel.updateOne({roomId: body.roomId}, {$push: {messages: [message]}}).then(() => {
                console.log('New message Succes');                                                                                           
            })
        }
    }

    async LastMessage(roomid: string){
        let chatroom = await this.chatroomModel.findOne({roomId: roomid});
        if (!chatroom)
            return [];
        let idx = chatroom.messages.length;
        if (idx == 0) {
            return [];
        }
        else {
            let data = chatroom.messages[idx-1];
            return data;
        }
    }
}