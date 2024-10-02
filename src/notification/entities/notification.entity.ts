import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class Notification {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => ID)
  recipient: Types.ObjectId;

  @Field(() => ID)
  sender: Types.ObjectId;

  @Field()
  type: string;

  @Field()
  message: string;

  @Field()
  isRead: boolean;

  @Field(() => Date)
  createdAt: Date;
}