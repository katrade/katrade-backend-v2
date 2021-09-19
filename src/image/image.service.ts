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

    async changeInventoryImageArrayToBase64(inventoryArray: Inventory[]){
        let n:number = inventoryArray.length;
        for(let i = 0; i < n; i++){
            let nImage:number = inventoryArray[i].pictures.length;
            for(let j = 0; j < nImage; j++){
                inventoryArray[i].pictures[j] = await this.findAndChangeToBase64(inventoryArray[i].pictures[j]);
            }
        }
        return inventoryArray;
    }

    async findAndChangeToBase64Array(sarray:string[]){
        let n:number = sarray.length
        for(let i = 0; i < n; i++){
            let tmp:string = await this.findAndChangeToBase64(sarray[i]);
            sarray[i] = tmp;
        }
        return sarray;
    }

    async findAndChangeToBase64(id:string){
        let inventoryImage:Image = await this.imageModel.findOne({_id: id});
        if(!inventoryImage){
            return "not found";
        }
        return `data:image/jpeg;base64,${inventoryImage.image.toString('base64')}`;
    }

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