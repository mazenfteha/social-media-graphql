import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class Comment {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => ID)
  postId: Types.ObjectId;

  @Field(() => ID)
  userId: Types.ObjectId;

  @Field()
  content: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

}
