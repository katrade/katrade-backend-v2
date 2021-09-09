import { Controller, Get, Post, Body, UseGuards, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { InventoryService } from './inventory.service';
import { Inventory } from '../models/inventory.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findById(@Query('id') inventoryId:string): Promise<any>{
        return {data: await this.inventoryService.findInventoryById(inventoryId)}
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getAllThing') //ไว้สำหรับดูดข้อมูลทั้งหมดของคลังสินค้า
    ga(){
        return this.inventoryService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createnew(@Body() data: Inventory, @Req() req: Request){ //เอาไว้ใส่ข้อมูล
        const result = await this.inventoryService.newInv(req.user, data);
        return result;
    }
}