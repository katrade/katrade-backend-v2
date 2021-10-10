import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
require('dotenv').config();

@Injectable()
export class ResetPasswordStrategy extends PassportStrategy(Strategy, "resetPassword") {
  constructor(){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.secrectVerifyEmailKey,
    });
  }

  async validate(payload: { resetPasswordEmail: string }): Promise<any>{
    return {resetPasswordEmail: payload.resetPasswordEmail }
  }
}