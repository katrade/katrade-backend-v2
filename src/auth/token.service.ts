import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RefreshToken } from '../models/refresh-token.model';
import { TokenExpiredError } from 'jsonwebtoken';
import { User } from '../models/user.model';
import { RefreshTokenService } from './refreshToken.service';

export interface RefreshTokenPayload{
    jti: number;
    sub: number;
}

@Injectable()
export class TokenService {
    constructor(
        private readonly refreshTokenService: RefreshTokenService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ){}

    public async generateAccessToken(user:User): Promise<string>{
        const opts:any = {
            subject: user._id 
        }
        return await this.jwtService.signAsync({}, opts)
    }

    public async generateRefreshToken(user:User, expiresIn: number): Promise<string>{
        const token = await this.refreshTokenService.createRefreshToken(user, expiresIn)

        const opts:any = {
            expiresIn,
            subject: user._id,
            jwtid: token._id
        }
        return await this.jwtService.signAsync({},opts);
    }

    private async decodeRefreshToken(token: string):Promise<any>{
        try{
            let decode = await this.jwtService.verifyAsync(token);
            console.log(decode);
            return decode;
        } catch (err) {
            if(err in TokenExpiredError){
                throw new UnprocessableEntityException('Refresh Token expried');
            }
            else{
                throw new UnprocessableEntityException('Refresh Token malformed');
            }
        }
    }

    private async getUserFromRefreshTokenPayload(payload: any):Promise<User>{
        const subId = payload.sub;

        if(!subId){
            throw new UnprocessableEntityException('Refresh Token malformed');
        }
        return await this.userService.findAny({_id: subId});
    }

    private async getStoredTokenFromRefreshTokenPayload(payload: any):Promise<RefreshToken | null>{
        const tokenId = payload.jti;

        if(!tokenId){
            throw new UnprocessableEntityException('Refresh Token malformed');
        }
        return await this.refreshTokenService.findTokenById(tokenId);
    }

    public async resolveRefreshToken(encoded: string): Promise<{user: User, token: RefreshToken}>{
        const payload = await this.decodeRefreshToken(encoded);
        const token = await this.getStoredTokenFromRefreshTokenPayload(payload);
        if(!token){
            throw new UnprocessableEntityException('Refresh Token not found');
        }
        if(token.is_revoked){
            throw new UnprocessableEntityException('Refresh Token revolked');
        }
        const user = await this.getUserFromRefreshTokenPayload(payload);

        if(!user){
            throw new UnprocessableEntityException('Refresh Token malformed');
        }

        return {user, token};
    }

    public async createAccessTokenFromRefreshToken(refresh: string): Promise<{token:string, user:User}>{
        const { user } = await this.resolveRefreshToken(refresh);

        const token = await this.generateAccessToken(user);

        return { user, token }
    }
}