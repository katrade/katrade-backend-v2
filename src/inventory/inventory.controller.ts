import { Controller, Get, Post, Body, UseGuards, Query, Req, Put, Delete } from '@nestjs/common';
import { Request } from 'express';
import { InventoryService } from './inventory.service';
import { Inventory, ResponseInventory, subCat } from '../models/inventory.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('inventory')
export class InventoryController {
    constructor(
        private readonly inventoryService: InventoryService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('/getInventoryById')
    async findById(@Query('id') inventoryId:string): Promise<Inventory | any>{
        return await this.inventoryService.findInventoryById(inventoryId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getInventoryByUserId')
    async findByUserId(@Query('id') uid:string): Promise<Inventory[] | any>{
        return await this.inventoryService.findInventoryByUserId(uid);
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
    async getAll(){
        return await this.inventoryService.getAll();
    }

    @Get('/getMatchInventory')
    @UseGuards(JwtAuthGuard)
    async getMatchInventory(@Req() req, @Query('id') inventoryId: string){
        return await this.inventoryService.getMatchInventory(req.user.uid, inventoryId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/search')
    async search(@Req() req,@Query('query') query:string){
        let search:Inventory[] = await this.inventoryService.searchInventory(req.user.uid, query);
        return search;
        // return await this.imageService.changeInventoryOneImageArrayToBase64(search);
    }

    @Put('/changePic')
    @UseGuards(JwtAuthGuard)
    async changePic(@Body() body:any){
        return await this.inventoryService.changeInventoryPic(body.id, body.pictures);
    }

    @Put('/changeDetail')
    @UseGuards(JwtAuthGuard)
    async changeDetail(@Body() body:any){
        await this.inventoryService.changeInventoryDetail(body.id, body.detail);
    }

    @Put('/changeRequire')
    @UseGuards(JwtAuthGuard)
    async changeRequire(@Body() body:any){
        await this.inventoryService.changeInventoryRequire(body.id, body.require);
    }
    @Get('/getMatch')
    @UseGuards(JwtAuthGuard)
    async getMatch(@Req() req){
        return await this.inventoryService.getMatch(req.user.uid);
    }

    @Post('/searchByCategory')
    @UseGuards(JwtAuthGuard)
    async searchByCategory(@Req() req, @Body() category: subCat){
        return await this.inventoryService.searchByCategory(req.user.uid, category);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createnew(@Req() req:Request, @Body() body:Inventory) {
        return await this.inventoryService.newInv(req.user, body);
    }

    @Get('/getSelectItem')
    @UseGuards(JwtAuthGuard)
    async getSelectItem(@Req() req) {
        return await this.inventoryService.getSelectItem(req.user.uid);
    }
}