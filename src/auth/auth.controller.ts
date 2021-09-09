import { Get, Controller, Post, UseGuards, Req, Res, Body, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/user/user.service';
import { User } from '../models/user.model';
import { VerifyEmailGuard } from './guards/verifyEmail.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ){}

    // @Post('/test')
    // async test(@Request() req){
    //     let user = await this.authService.validateUser(req.body.Username, req.body.Password);
    //     return user;
    // }
    @Post('/signup')
    async craeteUser(@Body() data: User): Promise<any>{
        return this.userService.craete_new_user(data);
    }

    @Get('/google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req:Request) {}
    
    @Get('/loginGoogle')
    @UseGuards(AuthGuard('google'))
    async googleLogin(@Req() req:Request){
        return this.authService.googleLG(req);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    async login(@Req() req:Request, @Res({passthrough: true}) res:Response){
        let tmp = await this.authService.login(req.user);
        res.cookie('jwtToken', tmp.accessToken, {httpOnly: true});
        return {value: tmp.verifyEmail};
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getUserData')
    async getProfile(@Req() req:Request){
        return {data: await this.authService.getUser(req.user)};
    }

    @UseGuards(JwtAuthGuard)
    @Get('/resendVerifyEmail')
    async resendVerifyEmail(@Req() req:Request){
        let user: User = await this.authService.getUser(req.user);
        let verifyEmail:number = user.verifyEmail
        if(verifyEmail === 1){
            return {message : "already verify"}
        }
        return await this.userService.resendVerifyEmailLink(user)
    }

    @UseGuards(VerifyEmailGuard)
    @Get('/verify')
    verifyEmail(@Req() req: Request): any{
        return this.userService.verifyEmail(req.user);
    }
}
