import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
require('dotenv').config();

@Injectable()
export class VerifyEmailStrategy extends PassportStrategy(
  Strategy,
  'verifyEmailToken',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.secrectVerifyEmailKey,
    });
  }

  async validate(payload: { sub: string }): Promise<any> {
    return { uid: payload.sub };
  }
}
