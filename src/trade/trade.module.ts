import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from 'src/models/request.model';
import { userSchema } from 'src/models/user.model';
import { inventorySchema } from 'src/models/inventory.model';
import { TradeService } from './trade.service';
import { HistorySchema } from 'src/models/histrory.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'History', schema: HistorySchema },
      { name: 'Request', schema: RequestSchema },
      { name: 'User', schema: userSchema },
      { name: 'Inventory', schema: inventorySchema },
    ]),
  ],
  providers: [TradeService],
  exports: [TradeService],
})
export class TradeModule {}
