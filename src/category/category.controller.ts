import { Get, Post, Body, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Category } from 'src/models/category.model';
import { CategoryService } from './category.service';
import { subCat } from '../models/inventory.model';


@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    @Get('/getAll')
    async getAll(): Promise<Category[]>{
        return await this.categoryService.getAll();
    }


    @Get('/search')
    async sayHi(@Query('pattern') pattern:string){
        let all = await this.categoryService.getAll(); 
        let s:subCat[] = await this.categoryService.createAllAray(all);
        return await this.categoryService.searchCat(s, pattern);
    }

    @Post()
    async createNew(@Body() data: Category){
        return await this.categoryService.newCate(data);
    }

    @Get('/searchId')
    async searchId(@Query('id') id:string){
        return await this.categoryService.searchId(id);
    }

}