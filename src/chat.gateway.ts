import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody,OnGatewayConnection,OnGatewayDisconnect,SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";


@WebSocketGateway({cors: true})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{  
    @WebSocketServer()
    server;

    private logger = new Logger('ChatGateway');

    @SubscribeMessage('message')
        handleMessage(client: Socket,messageContent: { room: string, content: {author: string, type: string, message: string, timeStamp: Date}}):void{
            console.log('SEND DATA SUCCESS : ' + messageContent.content.message);
            this.server.to(messageContent.room).emit('message', messageContent);
        }
    
    // @SubscribeMessage('read_success')
    //     handleRead(client: Socket,message: { room: string, message: string}):void{
    //         this.server.in(message.room).emit('read_success', message.message);
    //     }


    @SubscribeMessage('joinroom')
    public JoinRoom(client: Socket, room: string):void{
            client.join(room)
            console.log('JOINROOM :' + room)
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