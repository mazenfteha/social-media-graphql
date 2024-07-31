import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
@ObjectType()
@Schema()
class Profile {
    @Field()
    @Prop()
    image: string;

    @Field()
    @Prop()
    bio: string;
}

const ProfileSchema = SchemaFactory.createForClass(Profile);
@ObjectType()
@Schema({ timestamps: true })
export class User extends Document {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field()
    @Prop({ required: true })
    name: string;

    @Field()
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Field(() => Profile)
    @Prop({ type: ProfileSchema })
    profile: Profile;

    @Field(() => [ID])
    @Prop({ type: [Types.ObjectId], ref: 'User' })
    friends: Types.ObjectId[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);


