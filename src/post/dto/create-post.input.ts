import { InputType, Field, ID } from '@nestjs/graphql';
import { IsArray, IsMongoId, IsNotEmpty, IsString} from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class CreatePostInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;

  @Field()
  @IsString()
  @IsNotEmpty()
  content: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  media?: string[];
}
