import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema()
export class Favorite{
    @Prop()
    userId: string;

    @Prop()
    inventoryId: string;

    @Prop()
    timeStamp: Date;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);