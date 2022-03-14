import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HistoryDocument = History & Document;

@Schema()
export class History {
  @Prop()
  sourceUserId: string;

  @Prop()
  targetUserId: string;

  @Prop()
  sourceUsername: string;

  @Prop()
  targetUsername: string;

  @Prop()
  sourceInventoryName: string;

  @Prop()
  targetInventoryName: string;

  @Prop()
  sourceInventoryPicture: string;

  @Prop()
  targetInventoryPicture: string;

  @Prop()
  timeStamp: Date;
}

export const HistorySchema = SchemaFactory.createForClass(History);
