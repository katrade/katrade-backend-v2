import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory, RequireAray } from 'src/models/inventory.model';
import { User } from '../models/user.model';

@Injectable()
export class InventoryService {
    constructor(@InjectModel('Inventory') private readonly inventoryModel: Model<Inventory>,
        @InjectModel('User') private readonly userModel: Model<User>
    ){}

    async findInventoryById(inventoryId: string): Promise<Inventory>{
        return await this.inventoryModel.findOne({_id: inventoryId})
    }

    async getAll(){
        return await this.inventoryModel.find();
    }
    
    async newInv(payload: any, thing: Inventory){
        let newThing = new this.inventoryModel({
            owner: payload.uid,
            ...thing
        })
        let tmp: string = "";
        await this.inventoryModel.create(newThing).then(async (response) => {
            await this.userModel.updateOne({_id: payload.uid}, {$push: {inventories: [response._id]}}).then(() => {
                console.log(`Already push in ${payload.uid}`)
                tmp = "Sc";
            })
        }).catch(() => {
            tmp = "Fail"
        })
        return {message: tmp};
    }
}