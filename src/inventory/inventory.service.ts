import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory, RequireAray, MatchInventory, ResponseInventory } from 'src/models/inventory.model';
import { User } from '../models/user.model';
import { TradeService } from 'src/trade/trade.service';
const Fuse = require('fuse.js');

@Injectable()
export class InventoryService {
    constructor(
        @InjectModel('Inventory') private readonly inventoryModel: Model<Inventory>,
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly tradeService: TradeService,
    ){}

    async getInventoryByIdArray(ids: string[], userId: string){
        let inventories: Inventory[] = []
        for(let i = 0; i < ids.length; i++){
            let inventory = await this.inventoryModel.findOne({_id: ids[i]})
            if(inventory){
                inventories.push(inventory)
            }
            else{
                await this.userModel.updateOne({_id: userId}, {$pull: {favourite: [ids[i]]}});
            }
        }
        return inventories;
    }

    async findInventoryByUserId(uid: string){
        return await this.inventoryModel.find({owner: uid, lock: 0});
    }

    async findInventoryById(inventoryId: string): Promise<ResponseInventory | any>{
        const i:Inventory = await this.inventoryModel.findOne({_id: inventoryId});
        return i;
    }

    async getAll(){
        const inventory: Inventory[] = await this.inventoryModel.find({lock: 0});
        const res = inventory.sort((a, b) => b.favourite.length - a.favourite.length);
        return res;
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

    async deleteInventoryById(uid: string, id:string){
        const user:User = await this.userModel.findOne({_id: uid});
        if(!user.inventories.includes(id)){
            return {message: "It's not your thing"};
        }
        await this.userModel.updateOne({_id: uid}, {$pull: {inventories: id}});
        const requestArray = await this.tradeService.findRequestByInventoryId(id);
        for(let i = 0; i < requestArray.length; i++) {
            await this.tradeService.cancelRequest(requestArray[i]._id);
        }
        await this.inventoryModel.deleteOne({_id: id});
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

    async changeInventoryDetail(id:string, detail:string){
        await this.inventoryModel.updateOne({_id:id}, {$set: {detail: detail}});
        return true;
    }

    async changeInventoryRequire(id: string, require: RequireAray[]){
        await this.inventoryModel.updateOne({_id: id}, {$set: {require: require}});
        return {value : true};
    }

    async searchByCategory(uid:string ,category: any){
        if(!category.childCategoryEn){
            return await this.inventoryModel.find({owner: {$ne: uid}, 'category.parentCategoryEn': category.parentCategoryEn });
        }
        else{
            return await this.inventoryModel.find({owner: {$ne: uid}, 'category.parentCategoryEn': category.parentCategoryEn, 'category.childCategoryEn': category.childCategoryEn });
        }
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

    async addFavorite(userId: string, inventoryId: string){
        await this.inventoryModel.updateOne({_id: inventoryId}, {$push: {favourite: [userId]}});
        return {value: true}
    }

    async deleteFavorite(userId: string, inventoryId: string){
        await this.inventoryModel.updateOne({_id: inventoryId}, {$pull: {favourite: userId}});
        return {value: true}
    }
}