import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory, RequireAray } from 'src/models/inventory.model';
import { User } from '../models/user.model';

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
}