import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class Profile {
    @Field({ nullable: true })
    image: string;

    @Field({ nullable: true })
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

    @Field(() => Profile, { nullable: true })
    profile: Profile;

    @Field(() => [ID])
    friends: Types.ObjectId[];

    @Field(() => [ID])
    friendRequests: Types.ObjectId[];

    @Field({ nullable: true })
    createdAt: Date;

    @Field({ nullable: true })
    updatedAt: Date;
}