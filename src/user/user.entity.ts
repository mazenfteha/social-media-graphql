import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class Profile {
    @Field()
    image: string;

    @Field()
    bio: string;
}

@ObjectType()
export class User {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field(() => Profile)
    profile: Profile;

    @Field(() => [ID])
    friends: Types.ObjectId[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}