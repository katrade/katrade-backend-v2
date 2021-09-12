import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Image } from 'src/models/image.model';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
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
        const user = await this.userService.findAny({email: email});
        if(user){
            let correct = await compare(pass, user.password)
            if(correct){
                return user;
            }
        }
        return null;
    }

    async getUser(payload: any){
        const user = await this.userService.findAny({_id: payload.uid});
        const profilePic: Image = await this.userService.findProfilePic(payload.uid);
        if(profilePic){
            user.profilePic = profilePic.image;
        }
        return user;
    }

    async login(user: any){
        const payload = {username: user.username, sub:user._id};
        return { accessToken: await this.jwtService.signAsync(payload), verifyEmail: user.verifyEmail === 1 ? true: false };
    }
}