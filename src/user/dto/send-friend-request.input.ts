import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SendFriendRequestInput {
    @Field(() => ID)
    @IsNotEmpty()
    senderId: string;

    @Field(() => ID)
    @IsNotEmpty()
    receiverId: string;
}