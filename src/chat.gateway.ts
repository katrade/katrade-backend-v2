import { Logger } from "@nestjs/common";
import { OnGatewayConnection,OnGatewayDisconnect,SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { ChatroomService } from "./chatroom/chatroom.service";
import { MessageForData } from "src/models/chatroom.model";


@WebSocketGateway({cors: {credentials : true}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{  
    @WebSocketServer()
    server;

    constructor(
        private readonly chatroomService: ChatroomService
    ){}

    private logger = new Logger('ChatGateway');

    @SubscribeMessage('message')
        async handleMessage(client: Socket,messageContent: { room: string, content: {sender: string, senderID: string, content_type: string, content: string, timeStamp: Date}}){
            console.log('SEND DATA SUCCESS : ' + messageContent.content.content);
            this.server.to(messageContent.room).emit('message', messageContent);
            let body : MessageForData = {
                roomId : messageContent.room, 
                sender: messageContent.content.sender, 
                content_type: messageContent.content.content_type, 
                content: messageContent.content.content, 
                timeStamp: messageContent.content.timeStamp
            }
            await this.chatroomService.addMessage(body);
        }

    @SubscribeMessage('joinroom')
        async JoinRoom(client: Socket, room: string){
            client.join(room)
            console.log('JOINROOM :' + room)
            await this.chatroomService.newroom(room);
            //this.server.emit('joinroom', room);
        }

    
    handleConnection() {
        console.log('client connect');
    }

    handleDisconnect() {
        console.log('client disconnect');
    }
}