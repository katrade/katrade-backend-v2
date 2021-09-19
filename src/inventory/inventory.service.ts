import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from 'src/models/inventory.model';
import { User } from '../models/user.model';
import { ImageService } from '../image/image.service';
const Fuse = require('fuse.js');

@Injectable()
export class InventoryService {
    constructor(
        @InjectModel('Inventory') private readonly inventoryModel: Model<Inventory>,
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly imageService: ImageService
    ){}

    async findInventoryById(inventoryId: string): Promise<Inventory | any>{
        let i:Inventory = await this.inventoryModel.findOne({_id: inventoryId});
        if(!i){
            return {message: "Can't find this inventory"};
        }
        i.pictures = await this.imageService.findAndChangeToBase64Array(i.pictures);
        return i;
    }

    async getAll(){
        return await this.inventoryModel.find();
    }

    async getUserInventory(userId: string){
        let allUserInventory:Inventory[] = await this.inventoryModel.find({owner: userId});
        return await this.imageService.changeInventoryImageArrayToBase64(allUserInventory);
    }

    async deleteInventoryById(uid: string, id:string){
        let user:User = await this.userModel.findOne({_id: uid});
        if(!user.inventories.includes(id)){
            return {message: "It's not your thing"};
        }
        await this.userModel.updateOne({_id: uid}, {$pull: {inventories: id}});
        await this.inventoryModel.deleteOne({_id: id});
        await this.imageService.deleteImage("inventoryPic", id);
        return {value: true};
    }
    
    async newInv(payload: any, thing: Inventory): Promise<Inventory>{
        let newThing = new this.inventoryModel({
            owner: payload.uid,
            timeStamp: new Date(),
            ...thing
        })
        let tmp: Inventory ;
        await this.inventoryModel.create(newThing).then(async (response) => {
            tmp = response;
            await this.userModel.updateOne({_id: payload.uid}, {$push: {inventories: [response._id.toString()]}}).then(() => {
                console.log(`Already push in ${payload.uid}`)
            })
        })
        return tmp;
    }

    async searchInventory(list: Inventory[] , query: string){
        const options = {
            includeScore: true,
            threshold: 0.2,
            minMatchCharLength: 3,
            keys: [
                {
                    name: 'detail',
                    weight: 0.1
                },
                {
                    name: 'name',
                    weight: 0.9
                }
            ]
        }
        const fuse = new Fuse(list, options);
        return await fuse.search(query);
    }

}