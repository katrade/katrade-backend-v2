import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { ImageDocument, Image } from '../models/image.model';
import { Inventory } from 'src/models/inventory.model';

@Injectable()
export class ImageService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Image') private readonly imageModel: Model<ImageDocument>,
        @InjectModel('Inventory') private readonly inventoryModel: Model<Inventory>,
    ){}

    async newInvPic(invId: string, filesBuffer: Buffer[]){
        const indexBuffer: number = filesBuffer.length;
        for(let i = 0; i < indexBuffer; i++){
            let newImage:any = await this.imageModel.create({
                parentId: invId,
                type: "inventoryPic",
                image: filesBuffer[i],
                timeStamp: new Date()
            })
            await this.inventoryModel.updateOne({_id: invId},  {$push: {pictures: [newImage._id]}});
        }
        return {value: true};
    }

    async findProfilePic(uid: string){
        return await this.imageModel.findOne({parentId: uid, type: "profilePic"});
    }

    async updateProfilePic(payload:any, data: Buffer){
        let queryImage:Image = await this.imageModel.findOne({parentId: payload.uid, type: "profilePic"});
        if(queryImage){
            await this.imageModel.updateOne({parentId: payload.uid, type: "profilePic"}, {$set: {image: data, timeStamp: new Date()}});
        }
        else{
            let newProfilePic: Image = new this.imageModel({
                parentId: payload.uid,
                type: "profilePic",
                image: data,
                timeStamp: new Date()
            })
            let newPic: any = await this.imageModel.create(newProfilePic);
            await this.userModel.updateOne({_id: payload.uid}, {$set: {profilePic: newPic._id}});
        }
        return {value: true};
    }

    async deleteImage(type:string, parentId:string){
        await this.imageModel.deleteMany({parentId: parentId, type:type});
        return {value: true}; 
    }

}