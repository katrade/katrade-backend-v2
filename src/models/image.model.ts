import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image{
    @Prop()
    userId: string;

    @Prop()
    type: string;

    @Prop()
    image: string;

    @Prop()
    timeStamp: Date;
}

export const ImageSchema = SchemaFactory.createForClass(Image);