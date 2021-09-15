import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { inventorySchema } from 'src/models/inventory.model';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { userSchema } from '../models/user.model';
import { ImageService } from 'src/image/image.service';
import { ImageSchema } from '../models/image.model';
import { ImageModule } from 'src/image/image.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: "Inventory", schema: inventorySchema}, 
            {name: "User", schema: userSchema}
        ]),
        ImageModule
    ],
    controllers: [InventoryController],
    providers: [InventoryService]
})
export class InventoryModule {}
