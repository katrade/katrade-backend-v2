import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../models/user.model';
import { ImageSchema } from 'src/models/image.model';
import { ImageService } from './image.service';
import { inventorySchema } from 'src/models/inventory.model';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forFeature([
        {name: 'User', schema: userSchema}, 
        {name: 'Image', schema: ImageSchema},
        {name: "Inventory", schema: inventorySchema}
    ])
  ],
  providers: [ImageService],
  exports: [ImageService]
})
export class ImageModule {}