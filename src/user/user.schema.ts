import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema()
class Profile {
    
    @Prop()
    image: string;

    
    @Prop()
    bio: string;
}

const ProfileSchema = SchemaFactory.createForClass(Profile);
@Schema({ timestamps: true })
export class UserDocument extends Document {
    _id: Types.ObjectId;

    
    @Prop({ required: true })
    name: string;

    
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: ProfileSchema })
    profile: Profile;

    @Prop({ type: [Types.ObjectId], ref: 'User' })
    friends: Types.ObjectId[];

    @Prop({ type: [Types.ObjectId], ref: 'User' })
    friendRequests: Types.ObjectId[]

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);


