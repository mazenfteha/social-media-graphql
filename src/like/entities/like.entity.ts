import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class Like {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => ID)
  userId: Types.ObjectId;

  @Field(() => ID)
  postId: Types.ObjectId;

  @Field(() => Date)
  createdAt: Date;
}
