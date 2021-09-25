import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Inventory } from './inventory.model';

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

export interface RequestToClient{
    inventory1: Inventory;
    username1: string;
    inventory2: Inventory;
    username2: string;
    timeStamp: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);