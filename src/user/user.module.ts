import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../models/user.model';
import { MailService } from 'src/mail/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { VerifyEmailStrategy } from 'src/auth/strategies/verifyEmail.straregy';
import { PassportModule } from '@nestjs/passport';
import { ImageModule } from 'src/image/image.module';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: userSchema}]),
    JwtModule.register({
      secret: process.env.secrectVerifyEmailKey,
      signOptions: { expiresIn: process.env.expiresEmailKey },
    }),
    PassportModule.register({defaultStrategy: 'verifyEmailToken'}),
    ImageModule
  ],
  controllers: [UserController],
  providers: [UserService, MailService, VerifyEmailStrategy],
  exports: [UserService]
})
export class UserModule {}
