import * as mongoose from 'mongoose';
import { res2aray } from './response.model';

export const inventorySchema = new mongoose.Schema({
    owner: String, //เป็นไอดีของเจ้าของสิ่งของนี้
    name: String,
    detail: String,
    category: {
        parentCategoryEn: String,
        parentCategoryTh: String,
        childCategoryEn: String,
        childCategoryTh: String
    },
    pictures: [],
    require: [
        {
            reqCat: {
                parentCategoryEn: String,
                parentCategoryTh: String,
                childCategoryEn: String,
                childCategoryTh: String
            },
            detail: String
        }
    ]
});

export interface RequireAray {
    reqCat: res2aray;
    detail: string;
}

export interface Inventory {
    _id: string;
    owner: string;
    name: string;
    detail: string;
    category: res2aray;
    pictures: string[];
    require: RequireAray[];
}