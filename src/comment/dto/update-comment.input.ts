import { IsMongoId, IsNotEmpty } from 'class-validator';
import { InputType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class UpdateCommentInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  id: Types.ObjectId; 

  @Field(() => String, { nullable: true })
  content?: string; 

}
