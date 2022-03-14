import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../models/user.model';
import { MailService } from 'src/mail/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { VerifyEmailStrategy } from 'src/auth/strategies/verifyEmail.straregy';
import { PassportModule } from '@nestjs/passport';
import { TradeModule } from 'src/trade/trade.module';
import { InventoryService } from 'src/inventory/inventory.service';
import { InventoryModule } from 'src/inventory/inventory.module';
import { inventorySchema } from 'src/models/inventory.model';
import { FollowSchema } from 'src/models/follow.model';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
      { name: 'Inventory', schema: inventorySchema },
      { name: 'Follow', schema: FollowSchema },
    ]),
    JwtModule.register({
      secret: process.env.secrectVerifyEmailKey,
      signOptions: { expiresIn: process.env.expiresEmailKey },
    }),
    PassportModule.register({ defaultStrategy: 'verifyEmailToken' }),
    TradeModule,
    InventoryModule,
  ],
  controllers: [UserController],
  providers: [UserService, MailService, VerifyEmailStrategy, InventoryService],
  exports: [UserService],
})
export class UserModule {}
