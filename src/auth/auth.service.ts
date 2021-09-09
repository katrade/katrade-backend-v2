import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly UserService: UserService,
        private readonly JwtService: JwtService,
    ){}

    async googleLG(req: any){
        if (!req.user) {
            return 'No user from google'
        }
        return {
            message: 'User information from google',
            user: req.user
        }
    }

    async validateUser(email: string, pass: string):Promise<any>{ //ทำงานได้
        const user = await this.UserService.findAny({email: email});
        if(user){
            let correct = await compare(pass, user.password)
            if(correct){
                return user;
            }
        }
        return null;
    }

    async getUser(payload: any){
        const user = await this.UserService.findAny({_id: payload.uid});
        return user;
    }

    async login(user: any){
        const payload = {username: user.username, sub:user._id};
        return { accessToken: await this.JwtService.signAsync(payload), verifyEmail: user.verifyEmail === 1 ? true: false };
    }
}