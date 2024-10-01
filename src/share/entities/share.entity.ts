import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class Share {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => ID)
  userId: Types.ObjectId;

  @Field(() => ID)
  postId: Types.ObjectId;

  @Field({ nullable: true })
  caption?: string;

  @Field(() => Date)
  sharedAt: Date;
}
