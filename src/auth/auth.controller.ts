import { Get, Controller, Post, UseGuards, Req, Res, Body, Query, Patch, Put } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/user/user.service';
import { User } from '../models/user.model';
import { VerifyEmailGuard } from './guards/verifyEmail.guard';
import { ResetPasswordGuard } from './guards/resetPassword.guard';
require('dotenv').config();

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ){}
    
    @Post('/signup')
    async craeteUser(@Body() data: User): Promise<any>{
        return this.userService.craete_new_user(data);
    }

    @Post('/validateNontsriAccount')
    async validateNontsriAccount(@Body() {username, password}: {username: string; password: string}) {
        return this.authService.validateNontsriAccount(username, password)
    }

    @Patch('/resetPassword')
    @UseGuards(ResetPasswordGuard)
    async resetPassword(@Req() req, @Body('password') password: string){
        return this.userService.resetPassword(req.user.resetPasswordEmail, password);
    }

    @Post('/sendResetPasswordEmail')
    async sendResetPasswordEmail(@Body('email') email: string){
        return this.authService.sendResetPasswordEmail(email);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    async login(@Req() req:Request, @Res() res:Response){
        let tmp = await this.authService.login(req.user);
        res.json({DaveTheHornyDuck: tmp.accessToken, verifyEmail: tmp.verifyEmail, setUsername: tmp.setUsername});
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/changePassword')
    async changePassword(@Req() req, @Body('newPassword') newPassword: string, @Body('currentPassword') currentPassword:string){
        return await this.userService.changePassword(req.user.uid, currentPassword, newPassword);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/signout')
    async signout(@Res({passthrough: true}) res:Response){
        res.clearCookie(process.env.SCK, {httpOnly: true})
        return {value: true};
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getUserData')
    async getProfile(@Req() req:Request){
        return {data: await this.authService.getUser(req.user)};
    }

    @UseGuards(JwtAuthGuard)
    @Get('/resendVerifyEmail')
    async resendVerifyEmail(@Req() req:Request, @Res() res: Response){
        let user: User = await this.authService.getUser(req.user);
        if(user.verifyEmail === 1){
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