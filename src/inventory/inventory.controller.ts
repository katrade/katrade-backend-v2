import { Controller, Get, Post, Body, UseGuards, Query, Req, UseInterceptors, UploadedFiles, Res, Delete } from '@nestjs/common';
import { Request } from 'express';
import { InventoryService } from './inventory.service';
import { Inventory, ResponseInventory } from '../models/inventory.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UserService } from 'src/user/user.service';
import { ImageService } from 'src/image/image.service';

@Controller('inventory')
export class InventoryController {
    constructor(
        private readonly inventoryService: InventoryService,
        private readonly imageService: ImageService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('getInventoryById')
    async findById(@Query('id') inventoryId:string): Promise<Inventory | any>{
        return await this.inventoryService.findInventoryById(inventoryId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getUserInventory')
    async getUserInventory(@Req() req): Promise<Inventory[]>{
        let uid:string = req.user.uid;
        return await this.inventoryService.getUserInventory(uid);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('deleteInventoryById')
    async deleteInventoryById(@Req() req, @Query('id') id:string){
        let uid:string = req.user.uid;
        return await this.inventoryService.deleteInventoryById(uid, id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getAllInventory')
    getAll(){
        return this.inventoryService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/search')
    async search(@Query('query') query:string){
        let search:Inventory[] = await this.inventoryService.searchInventory(query);
        return search;
        // return await this.imageService.changeInventoryOneImageArrayToBase64(search);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createnew(@Req() req:Request, @Body() body:Inventory) {
        // const data = JSON.parse(body);
        return await this.inventoryService.newInv(req.user, body);
        // const result = await this.imageService.newInvPic(newInv._id, filesBuffer);
        // return result;
    }

    // @Post()
    // @UseGuards(JwtAuthGuard)
    // async createnew(@Body() data: Inventory, @Req() req: Request){
    //     const result = await this.inventoryService.newInv(req.user, data);
    //     return result;
    // }
}