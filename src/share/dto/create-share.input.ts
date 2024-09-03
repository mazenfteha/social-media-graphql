import { InputType, Field, ID } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class CreateShareInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  postId: Types.ObjectId;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  caption: string;

}
