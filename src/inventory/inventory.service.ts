import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory, ResponseInventory, MatchInventory } from 'src/models/inventory.model';
import { User } from '../models/user.model';
import { TradeService } from 'src/trade/trade.service';
const Fuse = require('fuse.js');

@Injectable()
export class InventoryService {
    constructor(
        @InjectModel('Inventory') private readonly inventoryModel: Model<Inventory>,
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly tradeService: TradeService
    ){}

    async getInventoryByIdArray(id: string[]){
        let inventoryArray: Inventory[] = await this.inventoryModel.find({_id: {$in : id}});
        return inventoryArray;
        // return this.imageService.changeInventoryOneImageArrayToBase64(inventoryArray);
    }

    async findInventoryByUserId(uid: string){
        return await this.inventoryModel.find({owner: uid, lock: 0});
    }

    async findInventoryById(inventoryId: string): Promise<Inventory | any>{
        let i:Inventory = await this.inventoryModel.findOne({_id: inventoryId});
        // let user:User = await this.userModel.findOne({_id: i.owner});
        // if(!i){
        //     return {message: "Can't find this inventory"};
        // }
        // i.pictures = await this.imageService.findAndChangeToBase64Array(i.pictures);
        return i;
    }

    async getAll(){
        const inventory: Inventory[] = await this.inventoryModel.find({lock: 0});
        return inventory;
        // return await this.imageService.changeInventoryOneImageArrayToBase64(inventory);
    }

    async getUserInventory(userId: string){
        let allUserInventory:Inventory[] = await this.inventoryModel.find({owner: userId});
        return allUserInventory;
    }

    async getMatchInventory(uid:string, inventoryId:string){
        const inventory = await this.inventoryModel.findOne({_id: inventoryId});
        if(!inventory){
            return {message: "Can't find inventory"};
        }
        const userInventory = await this.inventoryModel.find({owner: uid});
        let result: Inventory[] = [];
        for(let i = 0; i < userInventory.length; i++){
            for(let j = 0; j < inventory.require.length; j++){
                if(userInventory[i].category.childCategoryEn === inventory.require[j].reqCat.childCategoryEn && userInventory[i].category.parentCategoryEn === inventory.require[j].reqCat.parentCategoryEn){
                    result.push(userInventory[i]);
                }
            }
        }
        return result;
    }

    async getMatch(uid:string){
        const userInventory: Inventory[] = await this.inventoryModel.find({owner: uid});
        if(!userInventory){
            return { message: "This user doesn't has inventory" };
        }
        let requireCategory = [];
        for(let i = 0; i < userInventory.length; i++){
            for(let j = 0; j < userInventory[i].require.length; j ++) {
                requireCategory.push(userInventory[i].require[j].reqCat)
            }
        }
        const match: Inventory[] = await this.inventoryModel.find({owner: {$nin: [uid]} ,category: {$in: requireCategory}});
        let res:MatchInventory[] = [];
        for(let i = 0; i < match.length; i++){
            requireCategory = [];
            for(let j = 0; j < match[i].require.length; j ++) {
                requireCategory.push(match[i].require[j].reqCat)
            }
            let tmp: Inventory[] = await this.inventoryModel.find({owner: uid, category: {$in: requireCategory}});
            if(tmp.length > 0){
                res.push({match: match[i], matchWith: tmp});
            }
        }
        return res;
    }

    // async getUserInventory(userId: string){
    //     let allUserInventory:Inventory[] = await this.inventoryModel.find({owner: userId});
    //     if(!allUserInventory[0]){
    //         return [];
    //     }
    //     return await this.imageService.changeInventoryOneImageArrayToBase64(allUserInventory);
    // }

    async deleteInventoryById(uid: string, id:string){
        const user:User = await this.userModel.findOne({_id: uid});
        if(!user.inventories.includes(id)){
            return {message: "It's not your thing"};
        }
        await this.userModel.updateOne({_id: uid}, {$pull: {inventories: id}});
        await this.inventoryModel.deleteOne({_id: id});
        const requestArray = await this.tradeService.findRequestByInventoryId(id);
        for(let i = 0; i < requestArray.length; i++) {
            await this.tradeService.cancelRequest(requestArray[i]._id);
        }
        return {value: true};
    }
    
    async newInv(payload: any, thing: Inventory): Promise<{id: string}>{
        let user = await this.userModel.findOne({_id: payload.uid})
        let newThing = new this.inventoryModel({
            username: user.username,
            owner: payload.uid,
            lock: 0,
            timeStamp: new Date(),
            ...thing
        })
        let tmp: Inventory ;
        await this.inventoryModel.create(newThing).then(async (response) => {
            tmp = response;
            await this.userModel.updateOne({_id: payload.uid}, {$push: {inventories: [response._id.toString()]}}).then(() => {
                console.log(`Already push in ${payload.uid}`);
            })
        })
        return {id: newThing._id.toString()};
    }

    async changeInventoryPic(id: string, pictures: string[]){
        await this.inventoryModel.updateOne({_id: id}, {$set: {pictures: pictures}});
        return {value : true};
    }

    async searchInventory(uid: string, query: string){
        const list:Inventory[] = await this.inventoryModel.find({owner: {$ne: uid},lock: 0});
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