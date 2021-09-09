import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshToken } from '../models/refresh-token.model';
import { User } from '../models/user.model';

@Injectable()
export class RefreshTokenService {
    constructor(@InjectModel('RefreshToken') private readonly refreshTokenModel: Model<RefreshToken>){}

    public async createRefreshToken(user: User, ttl: number): Promise<RefreshToken>{
        const expiration = new Date();
        expiration.setTime(expiration.getTime() + ttl);
        const token = new this.refreshTokenModel({
            user_id: user._id,
            is_revoked: false,
            expried: expiration
        })
        return token.save() 
    }

    public async findTokenById(id: string): Promise<RefreshToken>{
        return await this.refreshTokenModel.findOne({_id: id});
    }
}