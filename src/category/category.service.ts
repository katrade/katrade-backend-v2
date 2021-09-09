import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { res2aray } from 'src/models/response.model';
import { Category } from '../models/category.model';
const Fuse = require('fuse.js');

let arayCat: res2aray[] = [];
 
@Injectable()
export class CategoryService {
    constructor(@InjectModel('Category') private readonly CategoryModel: Model<Category>){}

    async newCate(nc: Category){
        let tmp:string = "";
        await this.CategoryModel.create(nc).then(() => tmp = "Created").catch(() => tmp = "Failed")
        return {message: tmp};
    }

    async getAll(){
        return await this.CategoryModel.find() as Category[];
    }

    async createAllAray(all: Category[]){
        let s:res2aray[] = [];
        for(let i:number = 0; i < all.length; i++){
            let parentTh: string = all[i].parentCategoryTh;
            let parentEn: string = all[i].parentCategoryEn;
            for(let j: number = 0; j < all[i].childCategoryEn.length; j++){
                let tmp: res2aray = {
                    parentCategoryEn: parentEn,
                    parentCategoryTh: parentTh,
                    childCategoryEn: all[i].childCategoryEn[j],
                    childCategoryTh: all[i].childCategoryTh[j]
                }
                s.push(tmp);
            }
        }
        return s;
    }

    async searchId(id:string){
        let result:any = await this.CategoryModel.findOne({_id: id})
        console.log(result);
        return result;
    }

    async searchCat(list: res2aray[], pattern:string) {
        const options = {
            includeScore: true,
            threshold: 0.4,
            keys: [
                "ChildCategoryTh",
                "ChildCategoryEn"
            ]
        }
        const fuse = new Fuse(list, options);
        return await fuse.search(pattern);
    }
} 
