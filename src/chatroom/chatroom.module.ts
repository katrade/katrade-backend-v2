import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { chatroomSchema } from 'src/models/chatroom.model';
import { ChatroomController } from './chatroom.controller';
import { ChatroomService } from './chatroom.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chatroom', schema: chatroomSchema }]),
  ],
  controllers: [ChatroomController],
  providers: [ChatroomService],
  exports: [ChatroomService],
})
export class ChatroomModule {}
