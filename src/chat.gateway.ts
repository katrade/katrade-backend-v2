import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody,OnGatewayConnection,OnGatewayDisconnect,SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";


@WebSocketGateway(8081, {cors: {methods: ["GET", "POST"]}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{  
    @WebSocketServer()
    server;

    private logger = new Logger('ChatGateway');

    @SubscribeMessage('message')
        handleMessage(@MessageBody() message: { room: string, message: string}):void{
            this.server.to(message.room).emit('message', message.message);
        }
    
    @SubscribeMessage('read_success')
        handleRead(@MessageBody() message: { room: string, message: string}):void{
            this.server.to(message.room).emit('read_success', message.message);
        }


    @SubscribeMessage('joinroom')
        handleJoinRoom(@MessageBody() room: string):void{
            this.server.join(room)
            console.log('JOINROOM :' + room)
            //this.server.emit('joinroom', room);
        }
    
    @SubscribeMessage('leaveroom')
        handleLeaveRoom(@MessageBody() room: string):void{
            this.server.leave(room)
            console.log('LEAVEROOM :' + room)
            //this.server.emit('leaveroom', room);
        }
    
    handleConnection() {
        console.log('CONNECT SUCCESS');
    }

    handleDisconnect() {
        console.log('client disconnect');
    }
}