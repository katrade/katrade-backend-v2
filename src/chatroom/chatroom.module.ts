import { Module } from "@nestjs/common";
import { ChatroomController } from "./chatroom.controller";
import { ChatroomService } from "./chatroom.service";




@Module({
    imports: [],
    controllers: [ChatroomController],
    providers: [ChatroomService]
})
export class ChatroomModule {}