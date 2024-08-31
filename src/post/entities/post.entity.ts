import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { User } from 'src/user/user.entity';

@ObjectType()
export class Post {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => ID)
  userId: Types.ObjectId;

  @Field(() => User)
  user: User;

  @Field()
  content: string;

  @Field(() => [String], { nullable: true })
  media?: string[];

  @Field({ defaultValue: 0 })
  likeCount: number;

  @Field({ defaultValue: 0 })
  commentCount: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
