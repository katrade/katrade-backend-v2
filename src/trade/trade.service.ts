import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { Inventory } from 'src/models/inventory.model';
import { RequestDocument, Request, RequestToClient } from 'src/models/request.model';


@Injectable()
export class TradeService {
    constructor(
        @InjectModel('Request') private readonly requestModel: Model<RequestDocument>,
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Inventory') private readonly inventoryModel: Model<Inventory>
    ){}

    async createRequest(uid: string, request: Request){
        const inventory1: Inventory = await this.inventoryModel.findOne({_id: request.sourceInventoryId});
        const inventory2: Inventory = await this.inventoryModel.findOne({_id: request.targetInventoryId});
        if(!inventory1 || !inventory2){
            return {message: "Inventory has been deleted"};
        }
        if(inventory1 && inventory2){
            if(inventory1.owner !== uid && inventory2.owner !== request.targetUserId){
                return {message: "mai chai kong meung tang kuu"};
            }
        }
        if(inventory1){
            if(inventory1.owner !== uid){
                return {message: "mai chai kong user1"}
            }
            else if(inventory1.lock === 1){
                return {message: "sourceInventory lock"}
            }
        }
        if(inventory2){
            if(inventory2.owner !== request.targetUserId.toString()){
                return {message: "mai chai kong user2"}
            }
            else if(inventory2.lock === 1){
                return {message: "targetInventory lock"}
            }
        }
        const oldRequest: Request = await this.requestModel.findOne({sourceInventoryId: request.sourceInventoryId.toString(), targetInventoryId: request.targetInventoryId.toString()});
        if(oldRequest){
            return {value: false};
        }
        const newRequest: Request = {
            sourceUserId: uid,
            timeStamp: new Date(),
            targetUserId: request.targetUserId.toString(),
            sourceInventoryId: request.sourceInventoryId.toString(),
            targetInventoryId: request.targetInventoryId.toString(),
            sourceUserConfirm: 0,
            targetUserConfirm: 0,
            state: 0
        }
        let result: any = await this.requestModel.create(newRequest); 
        await this.userModel.updateOne({_id: request.targetUserId}, {$push: {requestInbox: [result._id.toString()]}});
        return {value: result ? true : false};
    }


    async getUserRequest(uid:string){
        const request:any[] = await this.requestModel.find({targetUserId : uid, state: 0});
        let result: RequestToClient[] = [];
        for(let i = 0; i < request.length; i++){
            let i1:Inventory = await this.inventoryModel.findOne({_id: request[i].sourceInventoryId});
            let i2:Inventory = await this.inventoryModel.findOne({_id: request[i].targetInventoryId});
            result.push({
                requestId: request[i]._id.toString(),
                sourceInventory: i1,
                targetInventory: i2,
                ownerInventoryId: i2._id,
                state: request[i].state,
                timeStamp: new Date(request[i].timeStamp.toString()).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})
            });
        }
        return result;
    }

    async getUserPending(uid:string){
        const request:any[] = await this.requestModel.find({sourceUserId : uid, state: 0});
        let result: RequestToClient[] = [];
        for(let i = 0; i < request.length; i++){
            let i1:Inventory = await this.inventoryModel.findOne({_id: request[i].sourceInventoryId});
            let i2:Inventory = await this.inventoryModel.findOne({_id: request[i].targetInventoryId});
            if(request[i].targetUserConfirm === 1 && request[i].sourceUserConfirm === 1 && request[i].state === 1){
                await this.requestModel.updateOne({_id: request[i]._id}, {$set: {state: 2}});
                await this.lockInventory(request[i].sourceInventoryId);
                await this.lockInventory(request[i].targetInventoryId);
                const requests = await this.findRequestByInventory2Id(request[i].sourceInventoryId, request[i].targetInventoryId);
                for(let j = 0; j < requests.length; j++) {
                    if(requests[j].sourceInventoryId === request[i].sourceInventoryId && requests[j].targetInventoryId === request[i].targetInventoryId){
                        continue;
                    }
                    await this.cancelRequest(requests[i]._id);
                }
            }
            result.push({
                requestId: request[i]._id.toString(),
                sourceInventory: i1,
                targetInventory: i2,
                ownerInventoryId: i1._id,
                state: request[i].state,
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
        await this.userModel.updateOne({_id: request.targetUserId}, {$pull: {requestInbox: requestId}});
        await this.requestModel.deleteOne({_id: requestId});
        return {value: true};
    }
    
    async findRequestByInventoryId(inventoryId: string){
        return await this.requestModel.find({$or: [{sourceInventoryId: inventoryId}, {targetInventoryId: inventoryId}]})
    }

    async lockInventory(inventoryId: string){
        await this.inventoryModel.updateOne({_id: inventoryId}, {$set: {lock: 1}});
        return true
    }

    async findRequestByInventory2Id(inventoryId1: string, inventoryId2: string){
        return await this.requestModel.find({$or: [{sourceInventoryId: inventoryId1}, {targetInventoryId: inventoryId1},{sourceInventoryId: inventoryId2}, {targetInventoryId: inventoryId2}]})
    }

    async lockRequestAndInventory(requestId: string, inventoryId: string){
        let request:Request = await this.requestModel.findOne({_id: requestId});
        const sourceInventory: Inventory = await this.inventoryModel.findOne({_id: request.sourceInventoryId});
        const targetInventory: Inventory = await this.inventoryModel.findOne({_id: request.targetInventoryId});
        if(!request){
            return {message: "Can't find this request"};
        }
        else if(sourceInventory.lock === 1 || targetInventory.lock === 1){
            return {message: "Inventory has been locked"};
        }
        if(request.sourceInventoryId === inventoryId.toString()){
            await this.requestModel.updateOne({_id: requestId}, {$set: {sourceUserConfirm: 1}});
            request.sourceUserConfirm = 1;
        }
        else if(request.targetInventoryId === inventoryId.toString()){
            await this.requestModel.updateOne({_id: requestId}, {$set: {targetUserConfirm: 1}});
            request.targetUserConfirm = 1;
        }
        if(request.sourceUserConfirm === 1 && request.targetUserConfirm === 1){
            await this.requestModel.updateOne({_id: requestId}, {$set: {state: 2}});
            await this.lockInventory(request.sourceInventoryId);
            await this.lockInventory(request.targetInventoryId);
            const requests = await this.findRequestByInventory2Id(request.sourceInventoryId, request.targetInventoryId);
            for(let i = 0; i < requests.length; i++) {
                if(requests[i].sourceInventoryId === request.sourceInventoryId && requests[i].targetInventoryId === request.targetInventoryId){
                    continue;
                }
                await this.cancelRequest(requests[i]._id);
            }
            return {message: "lock"};
        }
        else{
            return {message: "update userConfirm"};
        }
    }

    async cancelLockRequest(requestId: string){
        const request: Request = await this.requestModel.findOne({_id: requestId});
        if(request.state !== 2){
            return {value: false}
        }
        await this.inventoryModel.updateOne({_id: request.sourceInventoryId}, {$set: {lock: 0}});
        await this.inventoryModel.updateOne({_id: request.targetInventoryId}, {$set: {lock: 0}});
        return await this.cancelRequest(requestId);
    }

    async AcceptRequest(requestId: string){
        const request: Request = await this.requestModel.findOne({_id: requestId});
        if(!request){
            return {message: "Can't find request"};
        }
        await this.requestModel.updateOne({_id: requestId}, {$set: {state: 1}});
        return {value: true};
    }

    async GetUserProgess(uid: string){
        const requestArray = await this.requestModel.find({$or: [{sourceUserId: uid}, {targetUserId: uid}], state : {$in: [1, 2]}});
        console.log(requestArray);
        let result: RequestToClient[] = [];
        for(let i = 0; i < requestArray.length; i++){
            let inventory1: Inventory = await this.inventoryModel.findOne({_id: requestArray[i].sourceInventoryId});
            let inventory2: Inventory = await this.inventoryModel.findOne({_id: requestArray[i].targetInventoryId});
            let tmp : string;
            if(inventory1.owner === uid){
                tmp = inventory1._id;
            }
            else{
                tmp = inventory2._id;
            }
            result.push({
                requestId: requestArray[i]._id.toString(),
                sourceInventory: inventory1,
                targetInventory: inventory2,
                ownerInventoryId: tmp,
                state: requestArray[i].state,
                timeStamp: new Date(requestArray[i].timeStamp.toString()).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})
            });
        }
        return result;
    }
}
