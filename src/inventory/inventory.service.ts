import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from 'src/models/inventory.model';
import { User } from '../models/user.model';
const Fuse = require('fuse.js');

@Injectable()
export class InventoryService {
    constructor(
        @InjectModel('Inventory') private readonly inventoryModel: Model<Inventory>,
        @InjectModel('User') private readonly userModel: Model<User>
    ){}

    async findInventoryById(inventoryId: string): Promise<Inventory>{
        return await this.inventoryModel.findOne({_id: inventoryId})
    }

    async getAll(){
        return await this.inventoryModel.find();
    }

    async getUserInventory(userId: string){
        return await this.inventoryModel.find({owner: userId});
    }

    async deleteInventoryById(uid: string, id:string){
        let user:User = await this.userModel.findOne({_id: uid});
        if(!user.inventories.includes(id)){
            return {message: "It's not your thing"};
        }
        await this.userModel.updateOne({_id: uid}, {$pull: {inventories: id}});
        await this.inventoryModel.deleteOne({_id: id});
        return {value: true}
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