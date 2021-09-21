import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import { RequestDocument, Request } from 'src/models/request.model';

@Injectable()
export class TradeService {
    constructor(
        @InjectModel('Request') private readonly requestModel: Model<RequestDocument>,
        @InjectModel('User') private readonly userModel: Model<User>,
        ){}

    async createRequest(uid: string, request: Request){
        const newRequest: Request = {
            userId1: uid,
            timeStamp: new Date(),
            userId2: request.userId2.toString(),
            inventoryId1: request.inventoryId1.toString(),
            inventoryId2: request.inventoryId2.toString(),
            state: 0
        }
        let result: any = await this.requestModel.create(newRequest); 
        await this.userModel.updateOne({_id: request.userId2}, {$push: {requestInbox: [result._id]}});
        return {value: result ? true : false};
    }
}
