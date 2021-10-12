import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
require('dotenv').config();

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService){}

    async sendVerifyEmail(user: {token: string, email:string, name:string}){
        console.log(`send email to ${user.name}`);
        const url:string = `${process.env.client}/verify?token=${user.token}`;
        await this.mailerService.sendMail({
            to: user.email,
            from: process.env.Email,
            subject: 'Welcome to Katrade App! Confirm your Email',
            template: './confirmation',
            context: {
              name: user.name,
              url,
            },
        })
        return "Please check your email to verify";
    }

    async sendResetPasswordEmail(user: any, token:any){
        console.log(`send email to ${user.email}`);
        const url:string = `${process.env.client}/app/resetpassword?token=${token}`;
        await this.mailerService.sendMail({
            to: user.email,
            from: process.env.Email,
            subject: 'Reset your katrade account password',
            template: './resetPassword',
            context: {
              name: user.firstname,
              url,
            },
        })
    }
}
