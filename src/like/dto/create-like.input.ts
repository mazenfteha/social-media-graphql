import { InputType, Field, ID } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class CreateLikeInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  postId: Types.ObjectId;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;
}
