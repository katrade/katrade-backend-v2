import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Inventory } from './inventory.model';

export type RequestDocument = Request & Document;

@Schema()
export class Request{
    @Prop()
    sourceUserId: string;

    @Prop()
    targetUserId: string;

    @Prop()
    sourceInventoryId: string;

    @Prop()
    targetInventoryId: string;

    @Prop()
    sourceUserConfirm: number;

    @Prop()
    targetUserConfirm: number;

    @Prop()
    state: number;

    @Prop()
    timeStamp: Date;
}

export interface RequestToClient{
    requestId: string;
    sourceInventory: Inventory;
    targetInventory: Inventory;
    ownerInventoryId: string;
    timeStamp: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);