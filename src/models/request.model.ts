import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RequestDocument = Request & Document;

@Schema()
export class Request{
    @Prop()
    userId1: string;

    @Prop()
    userId2: string;

    @Prop()
    inventoryId1: string;

    @Prop()
    inventoryId2: string;

    @Prop()
    state: number;

    @Prop()
    timeStamp: Date;
}

export const RequestSchema = SchemaFactory.createForClass(Request);