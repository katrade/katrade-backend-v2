import * as mongoose from 'mongoose';

export const categorySchema = new mongoose.Schema({
    parentCategoryEn: String,
    parentCategoryTh: String,
    childCategoryEn: [],
    childCategoryTh: []
})

export interface Category {
    _id: string;
    parentCategoryEn: string;
    parentCategoryTh: string;
    childCategoryEn: string[];
    childCategoryTh: string[];
}