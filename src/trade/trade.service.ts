import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { Inventory } from 'src/models/inventory.model';
import { RequestDocument, Request, RequestToClient } from 'src/models/request.model';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class TradeService {
    constructor(
        @InjectModel('Request') private readonly requestModel: Model<RequestDocument>,
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Inventory') private readonly inventoryModel: Model<Inventory>,
        private readonly imageService: ImageService
    ){}

    async createRequest(uid: string, request: Request){
        const inventory1: Inventory = await this.inventoryModel.findOne({_id: request.inventoryId1});
        const inventory2: Inventory = await this.inventoryModel.findOne({_id: request.inventoryId2});
        if(!inventory1 || inventory2){
            return {message: "Inventory has been deleted"};
        }
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

    

    async getUserRequest(uid:string){
        const request:any[] = await this.requestModel.find({userId2 : uid});
        let result: RequestToClient[] = [];
        for(let i = 0; i < request.length; i++){
            let i1:Inventory = await this.imageService.changeInventoryImageToBase64(await this.inventoryModel.findOne({_id: request[i].inventoryId1}));
            let i2:Inventory = await this.imageService.changeInventoryImageToBase64(await this.inventoryModel.findOne({_id: request[i].inventoryId2}));
            result.push({
                requestId: request[i]._id.toString(),
                inventory1: i1,
                inventory2: i2,
                timeStamp: new Date(request[i].timeStamp.toString()).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})
            });
        }
        return result;
    }

    async getUserPending(uid:string){
        const request:any[] = await this.requestModel.find({userId1 : uid});
        console.log(request);
        let result: RequestToClient[] = [];
        for(let i = 0; i < request.length; i++){
            let i1:Inventory = await this.imageService.changeInventoryImageToBase64(await this.inventoryModel.findOne({_id: request[i].inventoryId1}));
            let i2:Inventory = await this.imageService.changeInventoryImageToBase64(await this.inventoryModel.findOne({_id: request[i].inventoryId2}));
            result.push({
                requestId: request[i]._id.toString(),
                inventory1: i1,
                inventory2: i2,
                timeStamp: new Date(request[i].timeStamp.toString()).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})
            });
        }
        return result;
    }

    async cancelRequest(requestId: string){
        const request: Request = await this.requestModel.findOne({_id: requestId});
        if(!request){
            return {message: "Can't find this request"};
        }
        await this.userModel.updateOne({_id: request.userId2}, {$pull: {requestInbox: requestId}});
        await this.requestModel.deleteOne({_id: requestId});
        return {value: true};
    }
    
    async findRequestByInventoryId(inventoryId: string){
        return await this.requestModel.find({$or: [{inventoryId1: inventoryId}, {inventoryId2: inventoryId}]})
    }
}
