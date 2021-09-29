import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FollowDocument = Follow & Document;

@Schema()
export class Follow{
    @Prop()
    from: string;

    @Prop()
    to: string;

    @Prop()
    timeStamp: Date;
}

export const FollowSchema = SchemaFactory.createForClass(Follow);