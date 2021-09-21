import { Put, Get, Body, Controller, Query, UseGuards, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { Request, Express } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from 'src/image/image.service';
import { TradeService } from 'src/trade/trade.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly imageService: ImageService,
        private readonly tradeService: TradeService
    ) {}

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

    // @Post('/updateProfilePic')
    // @UseGuards(JwtAuthGuard)
    // async updateProfilePic(@Req() req:Request, @Body() data: any){
    //     return await this.userService.updateProfilePic(req.user, data);
    // }

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

    @Put('/setUsername')
    @UseGuards(JwtAuthGuard)
    async setUsername(@Req() req:Request, @Query('newUsername') newUsername: string){
        return await this.userService.setUsername(req.user, newUsername);
    }

    @Put('/follow')
    @UseGuards(JwtAuthGuard)
    async follow(@Req() req, @Query('id') id:string){
        return await this.userService.follow(req.user.uid, id);
    }

    @Post('/updateProfilePic')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Req() req: Request, @UploadedFile() file: Express.Multer.File){
        // let b64 = file.buffer.toString('base64');
        // let b6 = Buffer.from(b64, 'base64');
        // console.log(b6);
        return await this.imageService.updateProfilePic(req.user, file.buffer);
    }

    @Post('/createRequest')
    @UseGuards(JwtAuthGuard)
    async createRequest(@Req() req, @Body() request: any){
        await this.tradeService.createRequest(req.user.uid, request);
    }

    @Get('/getFile')
    @UseGuards(JwtAuthGuard)
    async getFile(@Req() req){
        let uid: string = req.user.uid;
        return await this.imageService.findProfilePic(uid);
    }
}