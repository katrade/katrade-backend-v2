import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image{
    @Prop()
    parentId: string;

    @Prop()
    type: string;

    @Prop()
    image: Buffer;

    @Prop()
    timeStamp: Date;
}

export const ImageSchema = SchemaFactory.createForClass(Image);