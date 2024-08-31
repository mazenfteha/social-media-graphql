import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AcceptFriendRequestInput {
    @Field(() => ID)
    @IsNotEmpty()
    senderId: string;

    @Field(() => ID)
    @IsNotEmpty()
    receiverId: string;
}