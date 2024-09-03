import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { InputType, Field, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class UpdateShareInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  shareId : Types.ObjectId;
  
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
