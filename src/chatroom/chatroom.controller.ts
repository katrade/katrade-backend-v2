import { Body, Controller, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Chatroom, Message, MessageForData } from "src/models/chatroom.model";
import { ChatroomService } from "./chatroom.service";


@Controller('chatroom')
export class ChatroomController {
    constructor(
        private readonly chatroomService: ChatroomService
    ){}
    
    @UseGuards(JwtAuthGuard)
    @Post('/newroom')
    async newroom(@Body("roomid") roomid: string){
        await this.chatroomService.newroom(roomid);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getroom')
    async getroom(@Body("roomid") roomid: string){
        return await this.chatroomService.getroom(roomid);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/newmessage')
    async newmessage(@Body() body: MessageForData){
        await this.chatroomService.addMessage(body);
    }
}