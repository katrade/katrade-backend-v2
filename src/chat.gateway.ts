import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";


@WebSocketGateway(8000, {cors:true})
export class ChatGateway {  
    @WebSocketServer()
    server;

    @SubscribeMessage('message')
        handleMessage(@MessageBody() message: { room: string, message: string}):void{
            this.server.to(message.room).emit('message', message);
        }
    
    @SubscribeMessage('read_success')
        handleRead(@MessageBody() message: { room: string, message: string}):void{
            this.server.to(message.room).emit('read_success', message);
        }


    @SubscribeMessage('joinroom')
        handleJoinRoom(@MessageBody() room: string):void{
            this.server.join(room)
            this.server.emit('joinroom', room);
        }
    
    @SubscribeMessage('leaveroom')
        handleLeaveRoom(@MessageBody() room: string):void{
            this.server.leave(room)
            this.server.emit('leaveroom', room);
        }

}