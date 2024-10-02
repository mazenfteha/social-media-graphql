import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class NotificationDocument extends Document {
    _id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    recipient: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    sender: Types.ObjectId;

    @Prop({ required: true })
    type: string; // example: "friend_request", "comment", "like", etc.

    @Prop({ required: true })
    message: string;

    @Prop({ default: false })
    isRead: boolean;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(NotificationDocument);