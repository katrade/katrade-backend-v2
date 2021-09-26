import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { ImageDocument, Image } from '../models/image.model';
import { Inventory, ResponseInventory } from 'src/models/inventory.model';

@Injectable()
export class ImageService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Image') private readonly imageModel: Model<ImageDocument>,
        @InjectModel('Inventory') private readonly inventoryModel: Model<Inventory>,
    ){}

    // async changeInventoryOneImageArrayToBase64(inventoryArray: Inventory[]){
    //     const n:number = inventoryArray.length;
    //     let response: ResponseInventory[] = [];
    //     for(let i = 0; i < n; i++){
    //         const inventory = inventoryArray[i];
    //         let tmp: ResponseInventory = {
    //             _id: inventory._id,
    //             owner: inventory.owner,
    //             name: inventory.name,
    //             detail: inventory.detail,
    //             timeStamp: inventory.timeStamp,
    //             category: inventory.category,
    //             pictures:[],
    //             require: inventory.require
    //         }
    //         if(!inventoryArray[i].pictures){
    //             continue;
    //         }
    //         let inventoryImage:Image = await this.imageModel.findOne({_id: inventory.pictures[0]});
    //         // inventoryArray[i].pictures[0] = await this.findAndChangeToBase64(inventoryArray[i].pictures[0]);
    //         tmp.pictures.push(inventoryImage.image);
    //         response.push(tmp)
    //     }
    //     // return inventoryArray;
    //     return response;
    // }

    async changeInventoryImageToBase64(inventory: Inventory){
        console.log("hi-1")
        let n:number = inventory.pictures.length;
        console.log("hi0")
        if(!inventory.pictures){
            console.log("hi1")
            inventory.pictures = [];
        }
        else{
            console.log("hi2")
            inventory.pictures[0] = await this.findAndChangeToBase64(inventory.pictures[0]);
        }
        console.log("hi3")
        return inventory;
    }

    async changeInventoryOneImageArrayToBase64(inventoryArray: Inventory[]){
        let n:number = inventoryArray.length;
        for(let i = 0; i < n; i++){
            if(!inventoryArray[i].pictures){
                continue;
            }
            inventoryArray[i].pictures[0] = await this.findAndChangeToBase64(inventoryArray[i].pictures[0]);
        }
        return inventoryArray;
    }

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