import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { Request } from 'express';
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "accessToken") {
  constructor(private readonly userService: UserService){
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        let data = request.cookies['jwtToken'];
        return data;
      }]),
      ignoreExpiration: false,
      secretOrKey: process.env.secretKey,
    });
  }

  async validate(payload: {username: string, sub: string}): Promise<any>{
    return {uid: payload.sub, username: payload.username}
  }
}