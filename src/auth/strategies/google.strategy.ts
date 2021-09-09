import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from "src/user/user.service";
import { User } from "src/models/user.model";
import { config } from "dotenv";
config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly userService: UserService) {
      super({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: 'http://localhost:5000/auth/loginGoogle',
        scope: ['email', 'profile'],
      });
    }
  
    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
      const { name, emails, photos } = profile
      let u:User = await this.userService.findAny({Email: emails[0].value})
      if(!u){
        let newuser:any = {
          Firstname: profile.name.givenName,
          Lastname: profile.name.familyName,
          Username: profile.displayName,
          Password: "",
          Address: "",
          Email: emails[0].value,
          Phone_number: "",
          ProfilePic: photos[0].value,
          VerifyEmail: 1,
        }
        let m:any = await this.userService.craete_new_user(newuser);
        console.log(m);
      }
      const user = {
        
      }
      done(null, user);
    }
}