import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory, ResponseInventory } from 'src/models/inventory.model';
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
        let user:User = await this.userModel.findOne({_id: i.owner});
        if(!i){
            return {message: "Can't find this inventory"};
        }
        i.pictures = await this.imageService.findAndChangeToBase64Array(i.pictures);
        return i;
    }

    async getAll(){
        const inventory: Inventory[] = await this.inventoryModel.find();
        return await this.imageService.changeInventoryOneImageArrayToBase64(inventory);
    }

    async getUserInventory(userId: string){
        let allUserInventory:Inventory[] = await this.inventoryModel.find({owner: userId});
        if(!allUserInventory[0]){
            return [];
        }
        return await this.imageService.changeInventoryOneImageArrayToBase64(allUserInventory);
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
        let user = await this.userModel.findOne({_id: payload.uid})
        let newThing = new this.inventoryModel({
            username: user.username,
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

    async searchInventory(query: string){
        const list:Inventory[] = await this.inventoryModel.find();
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