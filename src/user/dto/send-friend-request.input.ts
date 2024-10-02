import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class SendFriendRequestInput {
    @Field(() => ID)
    @IsNotEmpty()
    senderId: Types.ObjectId;

    @Field(() => ID)
    @IsNotEmpty()
    receiverId: Types.ObjectId;
}