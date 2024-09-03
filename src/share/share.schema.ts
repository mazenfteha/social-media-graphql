import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class ShareDocument extends Document {
    _id: Types.ObjectId;
    
    @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
    postId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ type: String })
    caption?: string;

    @Prop({ default: Date.now })
    sharedAt: Date;
}

export const ShareSchema = SchemaFactory.createForClass(ShareDocument);