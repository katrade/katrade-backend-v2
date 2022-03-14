import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Inventory } from './inventory.model';

export type RequestDocument = Request & Document;

@Schema()
export class Request {
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
  sourceUserFinish: number;

  @Prop()
  targetUserFinish: number;

  @Prop()
  state: number;

  @Prop()
  timeStamp: Date;
}

export interface RequestToClient {
  requestId: string;
  sourceInventory: Inventory;
  targetInventory: Inventory;
  ownerInventoryId: string;
  userStatus: string;
  state: number;
  timeStamp: string;
}

export interface ProgessToClient {
  requestId: string;
  sourceInventory: Inventory;
  targetInventory: Inventory;
  ownerInventoryId: string;
  userFinish: number;
  userStatus: string;
  state: number;
  timeStamp: string;
}

export interface DealingToClient {
  requestId: string;
  sourceInventory: Inventory;
  targetInventory: Inventory;
  ownerInventoryId: string;
  userConfirm: number;
  state: number;
  timeStamp: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
