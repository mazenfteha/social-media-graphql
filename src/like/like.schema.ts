import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class LikeDocument extends Document {
    _id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
    postId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const LikeSchema = SchemaFactory.createForClass(LikeDocument);