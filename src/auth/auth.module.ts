import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { refreshTokenSchema } from '../models/refresh-token.model';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenService } from './refreshToken.service';
import { VerifyEmailStrategy } from './strategies/verifyEmail.straregy';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forFeature([{name: "RefreshToken", schema: refreshTokenSchema}]),
    UserModule,
    PassportModule.register({defaultStrategy: 'accessToken'}),
    JwtModule.register({
      secret: process.env.secretKey,
      signOptions: { expiresIn: process.env.expries },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy, RefreshTokenService, VerifyEmailStrategy],
})
export class AuthModule {}
