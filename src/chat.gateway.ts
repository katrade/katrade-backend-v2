import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody,OnGatewayConnection,OnGatewayDisconnect,SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { ChatroomService } from "./chatroom/chatroom.service";
import { MessageForData } from "src/models/chatroom.model";


@WebSocketGateway({cors: true})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{  
    @WebSocketServer()
    server;

    constructor(
        private readonly chatroomService: ChatroomService
    ){}

    private logger = new Logger('ChatGateway');

    @SubscribeMessage('message')
        async handleMessage(client: Socket,messageContent: { room: string, content: {author: string, authorID: string, type: string, message: string, timeStamp: Date}}){
            console.log('SEND DATA SUCCESS : ' + messageContent.content.message);
            this.server.to(messageContent.room).emit('message', messageContent);
            let body : MessageForData = {
                roomId : messageContent.room, 
                sender: messageContent.content.author, 
                content_type: messageContent.content.type, 
                content: messageContent.content.message, 
                timeStamp: messageContent.content.timeStamp
            }
            await this.chatroomService.addMessage(body);
        }
    
    // @SubscribeMessage('read_success')
    //     handleRead(client: Socket,message: { room: string, message: string}):void{
    //         this.server.in(message.room).emit('read_success', message.message);
    //     }


    @SubscribeMessage('joinroom')
        async JoinRoom(client: Socket, room: string){
            client.join(room)
            console.log('JOINROOM :' + room)
            await this.chatroomService.newroom(room);
            //this.server.emit('joinroom', room);
        }
    
    // @SubscribeMessage('leaveroom')
    //     handleLeaveRoom(client: Socket, @MessageBody() room: string):void{
    //         client.leave(room)
    //         console.log('LEAVEROOM :' + room)
    //         //this.server.emit('leaveroom', room);
    //     }
    
    handleConnection() {
        console.log('client connect');
    }

    handleDisconnect() {
        console.log('client disconnect');
    }
}