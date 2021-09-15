import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';
require('dotenv').config();

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly mailService: MailService,
        private readonly jwtService: JwtService,
    ){}

    async findForSignin(query: string): Promise<User>{
        return await this.userModel.findOne({$or: [{email: query}, {username: query}]})
    }

    async findAll(){
        const user: User[] = await this.userModel.find();
        return user
    }

    async findAny(a:any){
        const user = await this.userModel.findOne(a);
        return user as User;
    }

    async findUN(username:string ){
        const user = await this.userModel.findOne({Username: username});
        return user as User;
    }

    async sBid(id:string){
        const user = await this.userModel.findOne({_id: id});
        return user as User;
    }

    private async updateUserAndGenerrateTokenAndSendEmailVerify(user:User, data:User): Promise<string>{
        await this.userModel.updateOne({_id: user._id}, {$set: data});
        let payload: any = {
            sub: user._id
        }
        let token:string = this.jwtService.sign(payload);
        return await this.mailService.sendVerifyEmail({token: token, email: data.email, name: data.firstname});
    }

    async craete_new_user(data: User){
        let hashPassword: string = await bcrypt.hash(data.password, parseInt(process.env.salt));
        data.password = hashPassword;
        const newUser = new this.userModel({
            firstname: data.firstname,
            lastname: data.lastname,
            username: "",
            password: data.password,
            address: "",
            email: data.email,
            phoneNumber: "",
            profilePic: "",
            verifyEmail: 0,
            favourite:[],
            follower:[],
            following:[],
            inventories:[]
        });
        let m: any = "";
        let checkEmail:User = await this.userModel.findOne({email: data.email});
        if(checkEmail){
            if(checkEmail.verifyEmail === 1){
                m = "This email is already used";
            }
            else{
                m = await this.updateUserAndGenerrateTokenAndSendEmailVerify(checkEmail, data);
            }
        }
        else{
            let user = await this.userModel.create(newUser);
            let payload: any = {
                sub: user._id
            }
            let token:string = this.jwtService.sign(payload);
            m = await this.mailService.sendVerifyEmail({token: token, email: data.email, name: data.firstname});
        }
        return {message: m};
    }

    async resendVerifyEmailLink(user: User){
        if(user.verifyEmail === 1){
            return {message : "already verify"}
        }
        let payload: any = {
            sub: user._id
        }
        let token:string = this.jwtService.sign(payload);
        let m:string = await this.mailService.sendVerifyEmail({token: token, email: user.email, name: user.firstname});
        return {message: m};
    }

    async verifyEmail(payload: any):Promise<any>{
        await this.userModel.updateOne({_id: payload.uid}, {$set: {verifyEmail: 1}});
        return {message: "verify"};
    }

    async getFollow(payload:any, select: string): Promise<any>{
        let uid = payload.uid;
        let user = await this.userModel.findOne({_id: uid});
        return select === 'followers' ? user.followers: user.following;
    }

    async changeInfo(payload: any, data: any): Promise<any>{
        let result:any = await this.userModel.updateOne({_id: payload.uid}, {$set: data});
        return {value: result ? true : false};
    }

    async updateFollow(payload: any, select: string , data: string[]): Promise<any>{
        let result:any = await this.userModel.updateOne({_id: payload.uid}, {$set: select === 'follower' ? {followers: data} : {following: data}});
        return {value: result ? true : false};
    }

    async getFavorite(payload: any){
        let user:User = await this.userModel.findOne({_id: payload.uid});
        return { data: user.favourite };
    }

    async setUsername(payload:any ,newUsername: string){
        let checkUsername: User = await this.userModel.findOne({username: newUsername});
        if(checkUsername){
            return {message: "This username is already used"};
        }
        await this.userModel.updateOne({_id: payload.uid}, {$set: {username: newUsername}});
        return {message: "อะไรดีง่า"}
    }

    async sendEmail(email: string, name: string){
        const token = Math.floor(1000 + Math.random() * 9000).toString();
        // create user in db
        // ...
        // send confirmation mail
        // await this.mailService.send_confirm({email: email, name: name}, token);
        return "finsih";
    }  
}
