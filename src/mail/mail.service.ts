import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
require('dotenv').config();

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService){}

    async sendVerifyEmail(user: {token: string, email:string, name:string}){
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
}
