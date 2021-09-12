import { Put, Get, Body, Controller, Query, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/findAll')
    async findAll(){
        let user = await this.userService.findAll();
        // let result = await this.UserService.testfuse(user, username);
        return user;
    }

    @Get()
    async findUser(@Query("username") username:string){
        let user = await this.userService.findUN(username);
        // let result = await this.UserService.testfuse(user, username);
        return user;
    }

    @Get('/searchID')
    async findByID(@Query("id") id:string){
        let user = await this.userService.sBid(id);
        return user;
    }

    @Get('/sendMail')
    testemail(@Body() data:any){
        return this.userService.sendEmail(data.Email, data.Name);
    }

    @Get('/follower')
    @UseGuards(JwtAuthGuard)
    async follower(@Req() req:Request){
        let result = await this.userService.getFollow(req.user, "follower");
        return {data: result};
    }

    @Get('/following')
    @UseGuards(JwtAuthGuard)
    async following(@Req() req:Request){
        let result = await this.userService.getFollow(req.user, "following");
        return {data: result};
    }

    @Put('/info')
    @UseGuards(JwtAuthGuard)
    async info(@Req() req:Request, @Body() data: any){
        return await this.userService.changeInfo(req.user, data);
    }

    @Post('/updateProfilePic')
    @UseGuards(JwtAuthGuard)
    async updateProfilePic(@Req() req:Request, @Body() data: any){
        return await this.userService.updateProfilePic(req.user, data);
    }

    @Put('/follower')
    @UseGuards(JwtAuthGuard)
    async editFollower(@Req() req:Request, @Body() body: any){
        return await this.userService.updateFollow(req.user, 'follower', body.data)
    }

    @Put('/following')
    @UseGuards(JwtAuthGuard)
    async editFollowing(@Req() req:Request, @Body() body: any){
        return await this.userService.updateFollow(req.user, 'following', body.data)
    }

    @Get('/favourite')
    @UseGuards(JwtAuthGuard)
    async favourite(@Req() req:Request){
        let result = await this.userService.getFavorite(req.user);
        return result;
    }
}