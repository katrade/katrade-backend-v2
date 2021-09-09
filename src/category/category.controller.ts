import { Get, Post, Body, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Category } from 'src/models/category.model';
import { CategoryService } from './category.service';
import { res2aray } from '../models/response.model';


@Controller('category')
export class CategoryController {
    constructor(private readonly CategoryService: CategoryService){}

    @Get('/search')
    async sayHi(@Query('pattern') pattern:string){
        let all = await this.CategoryService.getAll(); 
        let s:res2aray[] = await this.CategoryService.createAllAray(all);
        return await this.CategoryService.searchCat(s, pattern);
    }

    @Post()
    async createNew(@Body() data: Category){
        return await this.CategoryService.newCate(data);
    }

    @Get('/searchId')
    async searchId(@Query('id') id:string){
        return await this.CategoryService.searchId(id);
    }

}
