import { Controller, Get, Post, Body, UseGuards, Query, Req, UseInterceptors, UploadedFiles, Res } from '@nestjs/common';
import { Request } from 'express';
import { InventoryService } from './inventory.service';
import { Inventory } from '../models/inventory.model';
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
    @Get()
    async findById(@Query('id') inventoryId:string): Promise<any>{
        return {data: await this.inventoryService.findInventoryById(inventoryId)}
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getAllThing')
    ga(){
        return this.inventoryService.getAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    async createnew(@Req() req:Request, @UploadedFiles() files: Array<Express.Multer.File>, @Body('body') body:string) {
        let filesBuffer: Buffer[] = [];
        for(let i = 0; i < files.length; i++){
            filesBuffer.push(files[i].buffer);
        } 
        console.log(files);
        const data = JSON.parse(body);
        const newInv = await this.inventoryService.newInv(req.user, data);
        console.log(newInv);
        const result = await this.imageService.newInvPic(newInv._id, filesBuffer);
        return result;
    }

    // @Post()
    // @UseGuards(JwtAuthGuard)
    // async createnew(@Body() data: Inventory, @Req() req: Request){
    //     const result = await this.inventoryService.newInv(req.user, data);
    //     return result;
    // }
}