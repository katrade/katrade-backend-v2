import { Body, Controller, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Contactlist, Contactuser } from "src/models/contactlist.model";
import { ContactlistService } from "./contactlist.service";


@Controller('contactlist')
export class ContactlistController {
    constructor(
        private readonly contactlistService: ContactlistService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get('/getcontactlist')
    async getContactlist(@Query('userId') userId : string) {
        return await this.contactlistService.getcontactlist(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/addcontactlist')
    async addContactlist(@Body() body : Contactuser) {
        await this.contactlistService.addcontactlist(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('newcontactlist')
    async newcontactlist(@Body('userid') userid: string){
        await this.contactlistService.newcontactlist(userid);
    }
}