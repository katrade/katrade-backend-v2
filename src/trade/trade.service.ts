import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { Inventory } from 'src/models/inventory.model';
import { RequestDocument, Request } from 'src/models/request.model';

@Injectable()
export class TradeService {
    constructor(
        @InjectModel('Request') private readonly requestModel: Model<RequestDocument>,
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Inventory') private readonly inventoryModel: Model<Inventory>,
        ){}

    async createRequest(uid: string, request: Request){
        const inventory1: Inventory = await this.inventoryModel.findOne({_id: request.inventoryId1});
        const inventory2: Inventory = await this.inventoryModel.findOne({_id: request.inventoryId2});
        if(inventory1 && inventory2){
            if(inventory1.owner !== uid && inventory2.owner !== request.userId2){
                return {message: "mai chai kong meung tang kuu"};
            }
        }
        if(inventory1){
            if(inventory1.owner !== uid){
                return {message: "mai chai kong user1"}
            }
        }
        if(inventory2){
            if(inventory2.owner !== request.userId2.toString()){
                return {message: "mai chai kong user2"}
            }
        }
        const oldRequest: Request = await this.requestModel.findOne({inventoryId1: request.inventoryId1.toString(), inventoryId2: request.inventoryId2.toString()});
        if(oldRequest){
            return {message: "Request pai leaw"};
        }
        const newRequest: Request = {
            userId1: uid,
            timeStamp: new Date(),
            userId2: request.userId2.toString(),
            inventoryId1: request.inventoryId1.toString(),
            inventoryId2: request.inventoryId2.toString(),
            state: 0
        }
        let result: any = await this.requestModel.create(newRequest); 
        await this.userModel.updateOne({_id: request.userId2}, {$push: {requestInbox: [result._id.toString()]}});
        return {value: result ? true : false};
    }
}
