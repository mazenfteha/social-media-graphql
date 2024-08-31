import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class PostDocument extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    content: string;

    @Prop([String])
    media: string[];

    @Prop({ default: 0 })
    likeCount: number;

    @Prop({ default: 0 })
    commentCount: number;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(PostDocument);