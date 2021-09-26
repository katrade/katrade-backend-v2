import * as mongoose from 'mongoose';

export const inventorySchema = new mongoose.Schema({
    owner: String, //เป็นไอดีของเจ้าของสิ่งของนี้
    name: String,
    username: String,
    detail: String,
    timeStamp: Date,
    lock: Number,
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

export interface subCat{
    parentCategoryEn: string;
    parentCategoryTh: string;
    childCategoryEn: string;
    childCategoryTh: string;
}

export interface RequireAray {
    reqCat: subCat;
    detail: string;
}

export interface Inventory {
    _id: string;
    owner: string;
    username: string;
    lock: number;
    name: string;
    detail: string;
    timeStamp: Date,
    category: subCat;
    pictures: string[];
    require: RequireAray[];
}

export interface ResponseInventory {
    _id: string;
    owner: string;
    username: string;
    name: string;
    detail: string;
    timeStamp: Date,
    category: subCat;
    pictures: Buffer[];
    require: RequireAray[];
}